"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { FolderPlus, Plus } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { MediaPlaybackProvider } from "@/components/media/MediaPlayback";
import { OrientedMedia } from "@/components/media/OrientedMedia";
import { prepareMediaForUpload, prepareMediaListForUpload } from "@/lib/uploads/prepare-media";

type GalleryFolder = {
  id: string;
  name: string;
  _count?: { images: number };
};

type GalleryItem = {
  id: string;
  imageUrl: string;
  mediaType?: string;
  orientation?: string | null;
  caption: string | null;
  folderId?: string | null;
  folder?: { id: string; name: string } | null;
};

function isVideo(item: GalleryItem) {
  return item.mediaType === "video" || /\.(mp4|webm|mov|m4v)$/i.test(item.imageUrl);
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [caption, setCaption] = useState("");
  const [uploadFolderId, setUploadFolderId] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [moveFolderId, setMoveFolderId] = useState("");
  const [moving, setMoving] = useState(false);
  const [filterFolderId, setFilterFolderId] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editFolderId, setEditFolderId] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef(caption);
  const uploadFolderRef = useRef(uploadFolderId);
  const uploadingRef = useRef(false);

  useEffect(() => {
    captionRef.current = caption;
  }, [caption]);

  useEffect(() => {
    uploadFolderRef.current = uploadFolderId;
  }, [uploadFolderId]);

  async function loadFolders() {
    const response = await fetch("/api/admin/gallery/folders");
    if (response.ok) {
      setFolders(await response.json());
    }
  }

  async function loadItems() {
    const response = await fetch("/api/admin/gallery");
    if (response.ok) {
      setItems(await response.json());
    }
  }

  useEffect(() => {
    void loadFolders();
    void loadItems();
  }, []);

  const visibleItems = useMemo(() => {
    if (filterFolderId === "all") return items;
    if (filterFolderId === "unfiled") return items.filter((item) => !item.folderId);
    return items.filter((item) => item.folderId === filterFolderId);
  }, [items, filterFolderId]);

  async function createFolder(event: FormEvent) {
    event.preventDefault();
    const name = newFolderName.trim();
    if (!name || creatingFolder) return;
    setCreatingFolder(true);
    setError("");
    try {
      const response = await fetch("/api/admin/gallery/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = (await response.json()) as { error?: string; id?: string };
      if (!response.ok) {
        setError(data.error ?? "Could not create folder.");
        return;
      }
      setMessage(`Folder “${name}” created.`);
      setNewFolderName("");
      await loadFolders();
      if (data.id) setUploadFolderId(data.id);
    } catch {
      setError("Could not create folder.");
    } finally {
      setCreatingFolder(false);
    }
  }

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    if (uploadingRef.current) return;

    uploadingRef.current = true;
    setUploading(true);
    setError("");
    setMessage(`Preparing ${fileList.length} file(s)…`);

    try {
      const selected = await prepareMediaListForUpload(Array.from(fileList), setMessage);
      setMessage(`Uploading ${selected.length} file(s)…`);

      const formData = new FormData();
      selected.forEach((entry) => {
        formData.append("files", entry.file);
        formData.append("orientations", entry.orientation);
      });
      if (captionRef.current.trim()) {
        formData.append("caption", captionRef.current.trim());
      }
      if (uploadFolderRef.current) {
        formData.append("folderId", uploadFolderRef.current);
      }

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
      await loadFolders();
    } catch {
      setError("Upload failed. Please try again.");
      setMessage("");
    } finally {
      uploadingRef.current = false;
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function toggleSelected(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  }

  function toggleSelectAllVisible() {
    const ids = visibleItems.map((item) => item.id);
    const allSelected = ids.length > 0 && ids.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : ids);
  }

  async function moveSelected() {
    if (selectedIds.length === 0 || moving) return;
    setMoving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: selectedIds,
          folderId: moveFolderId || null,
        }),
      });
      const data = (await response.json()) as { error?: string; moved?: number };
      if (!response.ok) {
        setError(data.error ?? "Could not move items.");
        return;
      }
      setMessage(`Moved ${data.moved ?? selectedIds.length} item(s).`);
      setSelectedIds([]);
      await loadItems();
      await loadFolders();
    } catch {
      setError("Could not move items.");
    } finally {
      setMoving(false);
    }
  }

  function startEdit(item: GalleryItem) {
    setEditing(item);
    setEditCaption(item.caption ?? "");
    setEditFile(null);
    setEditFolderId(item.folderId ?? "");
    setError("");
  }

  async function saveEdit() {
    if (!editing || savingEdit) return;
    setSavingEdit(true);
    setError("");
    setMessage("Saving…");

    try {
      const formData = new FormData();
      formData.append("id", editing.id);
      formData.append("caption", editCaption);
      formData.append("folderId", editFolderId);
      if (editFile) {
        const prepared = await prepareMediaForUpload(editFile, setMessage);
        formData.append("file", prepared.file);
        formData.append("orientation", prepared.orientation);
      }

      const response = await fetch("/api/admin/gallery", {
        method: "PATCH",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Update failed.");
        setMessage("");
        return;
      }
      setMessage("Gallery item updated.");
      setEditing(null);
      await loadItems();
      await loadFolders();
    } catch {
      setError("Update failed. Please try again.");
      setMessage("");
    } finally {
      setSavingEdit(false);
    }
  }

  async function confirmRemove() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    setSelectedIds((current) => current.filter((value) => value !== id));
    await loadItems();
    await loadFolders();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Gallery</h1>
      <p className="mt-2 text-sm text-slate-400">
        Photos stay full quality. Videos compress before upload. Landscape and portrait media keep
        their natural frame. Create folders to organise albums.
      </p>

      <form
        onSubmit={createFolder}
        className="mt-8 flex flex-col gap-3 rounded-[2rem] border border-white/10 p-6 sm:flex-row sm:items-end"
      >
        <label className="block flex-1">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            New folder name
          </span>
          <input
            value={newFolderName}
            onChange={(event) => setNewFolderName(event.target.value)}
            disabled={creatingFolder}
            placeholder="e.g. Aarpoonam 2026"
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white disabled:opacity-60"
          />
        </label>
        <button
          type="submit"
          disabled={creatingFolder || !newFolderName.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 disabled:opacity-60"
        >
          <FolderPlus className="h-4 w-4" />
          {creatingFolder ? "Creating…" : "Create folder"}
        </button>
      </form>

      <div className="mt-6 space-y-5 rounded-[2rem] border border-white/10 p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          multiple
          className="hidden"
          disabled={uploading}
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
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white disabled:opacity-60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Upload into folder
          </span>
          <select
            value={uploadFolderId}
            onChange={(event) => setUploadFolderId(event.target.value)}
            disabled={uploading}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white disabled:opacity-60"
          >
            <option value="">Unfiled</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          disabled={uploading}
          onClick={() => {
            if (uploadingRef.current) return;
            fileInputRef.current?.click();
          }}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#031018] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {uploading ? "Working…" : "Add photos / videos"}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-[2rem] border border-white/10 p-6 lg:flex-row lg:items-end">
        <label className="block flex-1">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Filter folder
          </span>
          <select
            value={filterFolderId}
            onChange={(event) => setFilterFolderId(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
          >
            <option value="all">All items</option>
            <option value="unfiled">Unfiled</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
                {folder._count ? ` (${folder._count.images})` : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="block flex-1">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Move selected to
          </span>
          <select
            value={moveFolderId}
            onChange={(event) => setMoveFolderId(event.target.value)}
            disabled={moving || selectedIds.length === 0}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white disabled:opacity-60"
          >
            <option value="">Unfiled</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={toggleSelectAllVisible}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-slate-300"
          >
            {visibleItems.length > 0 &&
            visibleItems.every((item) => selectedIds.includes(item.id))
              ? "Clear selection"
              : "Select visible"}
          </button>
          <button
            type="button"
            disabled={moving || selectedIds.length === 0}
            onClick={() => void moveSelected()}
            className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#031018] disabled:opacity-60"
          >
            {moving ? "Moving…" : `Move (${selectedIds.length})`}
          </button>
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-cyan-300">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <MediaPlaybackProvider>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visibleItems.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <article
                key={item.id}
                className={`mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] border bg-[#07111f]/70 ${
                  selected ? "border-cyan-300/50" : "border-white/10"
                }`}
              >
                <OrientedMedia
                  src={item.imageUrl}
                  mediaType={item.mediaType}
                  orientation={item.orientation}
                  alt={item.caption ?? "Gallery image"}
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                        {isVideo(item) ? "Video" : "Photo"} ·{" "}
                        {item.orientation === "landscape" ? "Landscape" : "Portrait"}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {item.caption ?? "No caption"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.folder?.name ?? "Unfiled"}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleSelected(item.id)}
                      aria-label={`Select ${item.caption ?? "gallery item"}`}
                      className="mt-1 h-4 w-4 accent-cyan-300"
                    />
                  </div>
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
            );
          })}
        </div>
      </MediaPlaybackProvider>

      {editing ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020611]/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#07111f] p-6">
            <h2 className="text-xl font-semibold text-white">Edit gallery item</h2>
            <div className="mt-5 space-y-4">
              <input
                value={editCaption}
                onChange={(event) => setEditCaption(event.target.value)}
                placeholder="Caption"
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              />
              <select
                value={editFolderId}
                onChange={(event) => setEditFolderId(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              >
                <option value="">Unfiled</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
              <input
                ref={editFileRef}
                type="file"
                accept="image/*,video/mp4,video/webm,video/quicktime"
                className="hidden"
                disabled={savingEdit}
                onChange={(event) => setEditFile(event.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                disabled={savingEdit}
                onClick={() => editFileRef.current?.click()}
                className="inline-flex rounded-full border border-cyan-300/40 px-5 py-2.5 text-sm text-cyan-200 disabled:opacity-60"
              >
                {editFile ? `Replace with: ${editFile.name}` : "Replace photo or video"}
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={savingEdit}
                onClick={() => setEditing(null)}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-300 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={() => void saveEdit()}
                className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#031018] disabled:opacity-60"
              >
                {savingEdit ? "Saving…" : "Save changes"}
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
