/**
 * Client-side media prep before admin upload.
 * Images are left untouched. Videos are re-encoded to a web-friendly
 * size/bitrate so uploads and playback stay fast.
 */

const VIDEO_SKIP_UNDER_BYTES = 5 * 1024 * 1024;
const MAX_LONG_EDGE = 1280;
const TARGET_BITRATE = 2_800_000;
const MAX_COMPRESS_SECONDS = 90;

function isVideoFile(file: File) {
  return file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
}

function pickRecorderMime(): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? null;
}

function loadVideo(file: File): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    const url = URL.createObjectURL(file);
    video.src = url;

    const cleanup = () => URL.revokeObjectURL(url);

    video.onloadedmetadata = () => {
      // iOS sometimes reports 0 duration until seek
      if (!Number.isFinite(video.duration) || video.duration === 0) {
        video.currentTime = 0.001;
      }
    };

    video.oncanplay = () => resolve(video);
    video.onerror = () => {
      cleanup();
      reject(new Error("Could not read this video for compression"));
    };

    // Attach cleanup to element for later
    (video as HTMLVideoElement & { __objectUrl?: string }).__objectUrl = url;
  });
}

function scaledSize(width: number, height: number) {
  const longEdge = Math.max(width, height);
  if (longEdge <= MAX_LONG_EDGE) {
    return {
      width: Math.max(2, Math.round(width / 2) * 2),
      height: Math.max(2, Math.round(height / 2) * 2),
    };
  }
  const scale = MAX_LONG_EDGE / longEdge;
  return {
    width: Math.max(2, Math.round((width * scale) / 2) * 2),
    height: Math.max(2, Math.round((height * scale) / 2) * 2),
  };
}

async function compressVideoFile(file: File): Promise<File> {
  const mimeType = pickRecorderMime();
  if (!mimeType) return file;

  const video = await loadVideo(file);
  const objectUrl = (video as HTMLVideoElement & { __objectUrl?: string }).__objectUrl;

  try {
    if (video.duration > MAX_COMPRESS_SECONDS) {
      // Very long clips: skip heavy re-encode; caller still uploads original.
      return file;
    }

    const { width, height } = scaledSize(video.videoWidth || 720, video.videoHeight || 1280);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    const stream = canvas.captureStream(30);
    const mediaWithCapture = video as HTMLVideoElement & {
      captureStream?: () => MediaStream;
    };
    const audioTracks = mediaWithCapture.captureStream?.().getAudioTracks() ?? [];
    audioTracks.forEach((track) => stream.addTrack(track));

    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: TARGET_BITRATE,
    });

    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    const recorded = new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType.split(";")[0] }));
      recorder.onerror = () => reject(new Error("Video compression failed"));
    });

    recorder.start(250);
    await video.play();

    await new Promise<void>((resolve) => {
      const draw = () => {
        if (video.paused || video.ended) {
          resolve();
          return;
        }
        ctx.drawImage(video, 0, 0, width, height);
        requestAnimationFrame(draw);
      };
      draw();
      video.onended = () => resolve();
    });

    if (recorder.state !== "inactive") recorder.stop();
    stream.getTracks().forEach((track) => track.stop());

    const blob = await recorded;
    if (blob.size === 0 || blob.size >= file.size * 0.98) {
      return file;
    }

    const ext = mimeType.includes("mp4") ? "mp4" : "webm";
    const base = file.name.replace(/\.[^.]+$/, "") || "video";
    return new File([blob], `${base}-optimized.${ext}`, {
      type: blob.type || (ext === "mp4" ? "video/mp4" : "video/webm"),
      lastModified: Date.now(),
    });
  } finally {
    video.pause();
    video.removeAttribute("src");
    video.load();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

export async function prepareMediaForUpload(
  file: File,
  onStatus?: (message: string) => void
): Promise<File> {
  if (!isVideoFile(file)) {
    return file;
  }

  if (file.size <= VIDEO_SKIP_UNDER_BYTES) {
    return file;
  }

  onStatus?.("Compressing video for faster upload…");
  try {
    const compressed = await compressVideoFile(file);
    if (compressed.size < file.size) {
      onStatus?.(
        `Compressed ${(file.size / (1024 * 1024)).toFixed(1)} MB → ${(
          compressed.size /
          (1024 * 1024)
        ).toFixed(1)} MB. Uploading…`
      );
    } else {
      onStatus?.("Uploading…");
    }
    return compressed;
  } catch {
    onStatus?.("Compression skipped. Uploading original…");
    return file;
  }
}

export async function prepareMediaListForUpload(
  files: File[],
  onStatus?: (message: string) => void
): Promise<File[]> {
  const prepared: File[] = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    if (files.length > 1 && isVideoFile(file)) {
      onStatus?.(`Preparing ${index + 1}/${files.length}: ${file.name}`);
    }
    prepared.push(await prepareMediaForUpload(file, onStatus));
  }
  return prepared;
}
