"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { MediaPlaybackProvider } from "@/components/media/MediaPlayback";
import { OrientedMedia } from "@/components/media/OrientedMedia";
import { isVideoMedia } from "@/lib/media";
import { prepareMediaForUpload } from "@/lib/uploads/prepare-media";

type TestimonialItem = {
  id: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  content: string;
  rating: number;
  mediaUrl: string | null;
  mediaType: string | null;
  orientation?: string | null;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [editAuthorName, setEditAuthorName] = useState("");
  const [editAuthorRole, setEditAuthorRole] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);

  async function loadItems() {
    const response = await fetch("/api/admin/testimonials");
    if (response.ok) {
      setItems(await response.json());
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (submittingRef.current) return;

    setError("");
    setMessage("");

    if (
      !file &&
      !authorName.trim() &&
      !content.trim() &&
      !authorRole.trim() &&
      !company.trim()
    ) {
      setError("Add a photo/video or at least one review detail.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const formData = new FormData();
      if (file) {
        const prepared = await prepareMediaForUpload(file, setMessage);
        formData.append("file", prepared.file);
        formData.append("orientation", prepared.orientation);
      }
      formData.append("authorName", authorName);
      formData.append("authorRole", authorRole);
      formData.append("company", company);
      formData.append("content", content);
      formData.append("rating", String(rating));
      setMessage("Uploading…");

      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not save review.");
        setMessage("");
        return;
      }

      setMessage("Review published.");
      setAuthorName("");
      setAuthorRole("");
      setCompany("");
      setContent("");
      setRating(5);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadItems();
    } catch {
      setError("Could not save review.");
      setMessage("");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  function startEdit(item: TestimonialItem) {
    setEditing(item);
    setEditAuthorName(item.authorName);
    setEditAuthorRole(item.authorRole ?? "");
    setEditCompany(item.company ?? "");
    setEditContent(item.content);
    setEditRating(item.rating);
    setEditFile(null);
    setError("");
  }

  async function saveEdit() {
    if (!editing || savingEdit) return;
    setSavingEdit(true);
    setError("");

    const formData = new FormData();
    formData.append("id", editing.id);
    formData.append("authorName", editAuthorName);
    formData.append("authorRole", editAuthorRole);
    formData.append("company", editCompany);
    formData.append("content", editContent);
    formData.append("rating", String(editRating));
    if (editFile) {
      const prepared = await prepareMediaForUpload(editFile, setMessage);
      formData.append("file", prepared.file);
      formData.append("orientation", prepared.orientation);
    }

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Update failed.");
        return;
      }
      setMessage("Review updated.");
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
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    await loadItems();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Reviews & testimonials</h1>
      <form
        onSubmit={onSubmit}
        className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 p-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Photo or video (optional)
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v"
            className="hidden"
            disabled={submitting}
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            disabled={submitting}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ImagePlus className="h-4 w-4" />
            {file ? `Selected: ${file.name}` : "Choose photo or video"}
          </button>
        </div>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Name (optional)
          </span>
          <input
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Role (optional)
          </span>
          <input
            value={authorRole}
            onChange={(event) => setAuthorRole(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Company (optional)
          </span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Rating (optional)
          </span>
          <select
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} stars
              </option>
            ))}
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Review (optional)
          </span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#031018] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 md:w-fit"
        >
          {submitting ? "Working…" : "Publish review"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-cyan-300">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <MediaPlaybackProvider>
      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]/70"
          >
            {item.mediaUrl ? (
              <OrientedMedia
                src={item.mediaUrl}
                mediaType={item.mediaType}
                orientation={item.orientation}
                alt={item.authorName || "Review"}
              />
            ) : null}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    {item.mediaUrl
                      ? isVideoMedia(item)
                        ? "Video"
                        : "Photo"
                      : "Written review"}
                  </p>
                  {item.authorName ? (
                    <h2 className="mt-2 text-lg font-semibold text-white">
                      {item.authorName}
                    </h2>
                  ) : null}
                  {(item.authorRole || item.company) && (
                    <p className="mt-1 text-sm text-cyan-300">
                      {[item.authorRole, item.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <span className="text-sm text-slate-400">{item.rating}/5</span>
              </div>
              {item.content ? (
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.content}</p>
              ) : null}
              <div className="mt-4 flex gap-4">
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
      </MediaPlaybackProvider>

      {editing ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020611]/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#07111f] p-6">
            <h2 className="text-xl font-semibold text-white">Edit review</h2>
            <div className="mt-5 grid gap-4">
              <input
                ref={editFileRef}
                type="file"
                accept="image/*,video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v"
                className="hidden"
                onChange={(event) => setEditFile(event.target.files?.[0] ?? null)}
              />
              <button
                type="button"
                onClick={() => editFileRef.current?.click()}
                className="inline-flex w-fit rounded-full border border-cyan-300/40 px-5 py-2.5 text-sm text-cyan-200"
              >
                {editFile
                  ? `Replace with: ${editFile.name}`
                  : "Add or replace photo/video"}
              </button>
              <input
                value={editAuthorName}
                onChange={(event) => setEditAuthorName(event.target.value)}
                placeholder="Name"
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              />
              <input
                value={editAuthorRole}
                onChange={(event) => setEditAuthorRole(event.target.value)}
                placeholder="Role"
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              />
              <input
                value={editCompany}
                onChange={(event) => setEditCompany(event.target.value)}
                placeholder="Company"
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              />
              <select
                value={editRating}
                onChange={(event) => setEditRating(Number(event.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} stars
                  </option>
                ))}
              </select>
              <textarea
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-[#07111f] px-4 py-3 text-white"
              />
            </div>
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
        title="Remove review?"
        message="This testimonial will be permanently removed from the public reviews page."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => void confirmRemove()}
      />
    </div>
  );
}
