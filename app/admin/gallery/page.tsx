"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

type GalleryItem = {
  id: string;
  imageUrl: string;
  mediaType?: string;
  caption: string | null;
};

function isVideo(item: GalleryItem) {
  return item.mediaType === "video" || /\.(mp4|webm|mov|m4v)$/i.test(item.imageUrl);
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef(caption);

  useEffect(() => {
    captionRef.current = caption;
  }, [caption]);

  async function loadItems() {
    const response = await fetch("/api/admin/gallery");
    if (response.ok) {
      setItems(await response.json());
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const selected = Array.from(fileList);
    setUploading(true);
    setError("");
    setMessage(`Uploading ${selected.length} file(s)...`);

    const formData = new FormData();
    selected.forEach((file) => formData.append("files", file));
    if (captionRef.current.trim()) {
      formData.append("caption", captionRef.current.trim());
    }

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        error?: string;
        uploaded?: number;
        failed?: number;
        errors?: string[];
      };

      if (!response.ok) {
        setError(data.error ?? "Upload failed.");
        setMessage("");
        return;
      }

      const parts = [`Added ${data.uploaded ?? selected.length} item(s).`];
      if (data.failed) parts.push(`${data.failed} failed.`);
      if (data.errors?.length) parts.push(data.errors.join(" "));

      setMessage(parts.join(" "));
      setCaption("");
      await loadItems();
    } catch {
      setError("Upload failed. Please try again.");
      setMessage("");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function startEdit(item: GalleryItem) {
    setEditing(item);
    setEditCaption(item.caption ?? "");
    setEditFile(null);
    setError("");
  }

  async function saveEdit() {
    if (!editing) return;
    setSavingEdit(true);
    setError("");

    const formData = new FormData();
    formData.append("id", editing.id);
    formData.append("caption", editCaption);
    if (editFile) formData.append("file", editFile);

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "PATCH",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Update failed.");
        return;
      }
      setMessage("Gallery item updated.");
      setEditing(null);
      await loadItems();
    } catch {
      setError("Update failed. Please try again.");
    } finally {
      setSavingEdit(false);
    }
  }

  async function confirmRemove() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    await loadItems();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        Click Add, select one or many photos/videos — they upload right away. You can add more any
        time.
      </p>

      <div className="mt-8 space-y-5 rounded-[2rem] border border-white/10 p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          multiple
          className="hidden"
          onChange={(event) => void uploadFiles(event.target.files)}
        />

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Caption (optional — applied to the next upload batch)
          </span>
          <input
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            disabled={uploading}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white disabled:opacity-60"
          />
        </label>

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#031018] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {uploading ? "Uploading..." : "Add photos / videos"}
        </button>
      </div>

      {message ? <p className="mt-4 text-sm text-cyan-300">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]/70"
          >
            <div className="relative aspect-[4/3] bg-black/40">
              {isVideo(item) ? (
                <video
                  src={item.imageUrl}
                  controls
                  className="h-full w-full object-cover"
                  preload="metadata"
                />
              ) : (
                <Image
                  src={item.imageUrl}
                  alt={item.caption ?? "Gallery image"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                {isVideo(item) ? "Video" : "Photo"}
              </p>
              <p className="mt-2 text-sm text-slate-300">{item.caption ?? "No caption"}</p>
              <div className="mt-3 flex gap-4">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="text-xs uppercase tracking-[0.2em] text-cyan-300"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDeleteId(item.id)}
                  className="text-xs uppercase tracking-[0.2em] text-rose-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020611]/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#07111f] p-6">
            <h2 className="text-xl font-semibold text-white">Edit gallery item</h2>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
                Caption
              </span>
              <input
                value={editCaption}
                onChange={(event) => setEditCaption(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white"
              />
            </label>
            <input
              ref={editFileRef}
              type="file"
              accept="image/*,video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={(event) => setEditFile(event.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => editFileRef.current?.click()}
              className="mt-4 inline-flex rounded-full border border-cyan-300/40 px-5 py-2.5 text-sm text-cyan-200"
            >
              {editFile ? `Replace with: ${editFile.name}` : "Replace photo / video"}
            </button>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={() => void saveEdit()}
                className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#031018] disabled:opacity-60"
              >
                {savingEdit ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Remove gallery item?"
        message="This photo or video will be permanently removed from the public gallery."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => void confirmRemove()}
      />
    </div>
  );
}
