"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { UploadedMedia } from "@/components/media/UploadedMedia";
import { isVideoMedia } from "@/lib/media";
import { prepareMediaForUpload } from "@/lib/uploads/prepare-media";

type PlacementItem = {
  id: string;
  imageUrl: string | null;
  mediaType: string;
  companyName: string;
  salary: string | null;
  course: string;
};

function formatSalaryLpa(raw: string): string | null {
  const cleaned = raw.replace(/[^\d.]/g, "").trim();
  if (!cleaned) return null;
  const amount = Number(cleaned);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const display = Number.isInteger(amount)
    ? String(amount)
    : String(Math.round(amount * 100) / 100);
  return `₹${display} LPA`;
}

function salaryAmountFromStored(value: string | null) {
  if (!value) return "";
  return value.replace(/[^\d.]/g, "");
}

export default function AdminPlacementsPage() {
  const [items, setItems] = useState<PlacementItem[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [course, setCourse] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<PlacementItem | null>(null);
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editSalaryAmount, setEditSalaryAmount] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);

  async function loadItems() {
    const response = await fetch("/api/admin/placements");
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

    const salary = salaryAmount.trim() ? formatSalaryLpa(salaryAmount) : null;
    if (salaryAmount.trim() && !salary) {
      setError("Enter a valid salary amount, e.g. 4.5");
      return;
    }

    if (!file && !companyName.trim() && !course.trim() && !salary) {
      setError("Add a photo/video or at least one placement detail.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const formData = new FormData();
      if (file) {
        const prepared = await prepareMediaForUpload(file, setMessage);
        formData.append("file", prepared);
      }
      formData.append("companyName", companyName);
      formData.append("course", course);
      if (salary) formData.append("salary", salary);
      setMessage("Uploading…");

      const response = await fetch("/api/admin/placements", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not save placement.");
        setMessage("");
        return;
      }

      setMessage("Placement added.");
      setCompanyName("");
      setCourse("");
      setSalaryAmount("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadItems();
    } catch {
      setError("Could not save placement.");
      setMessage("");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  function startEdit(item: PlacementItem) {
    setEditing(item);
    setEditCompanyName(item.companyName);
    setEditCourse(item.course);
    setEditSalaryAmount(salaryAmountFromStored(item.salary));
    setEditFile(null);
    setError("");
  }

  async function saveEdit() {
    if (!editing || savingEdit) return;
    setSavingEdit(true);
    setError("");

    const salary = editSalaryAmount.trim() ? formatSalaryLpa(editSalaryAmount) : null;
    if (editSalaryAmount.trim() && !salary) {
      setError("Enter a valid salary amount, e.g. 4.5");
      setSavingEdit(false);
      return;
    }

    const formData = new FormData();
    formData.append("id", editing.id);
    formData.append("companyName", editCompanyName);
    formData.append("course", editCourse);
    if (salary) formData.append("salary", salary);
    if (editFile) {
      const prepared = await prepareMediaForUpload(editFile, setMessage);
      formData.append("file", prepared);
    }

    try {
      const response = await fetch("/api/admin/placements", {
        method: "PATCH",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Update failed.");
        return;
      }
      setMessage("Placement updated.");
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
    await fetch(`/api/admin/placements?id=${id}`, { method: "DELETE" });
    await loadItems();
  }

  const salaryPreview = salaryAmount.trim() ? formatSalaryLpa(salaryAmount) : null;

  return (
    <div>
      <h1 className="text-3xl font-bold">Placements</h1>
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
            Company name (optional)
          </span>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Course taken (optional)
          </span>
          <input
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
            Salary amount (optional)
          </span>
          <div className="flex max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-slate-400">₹</span>
            <input
              value={salaryAmount}
              onChange={(event) => setSalaryAmount(event.target.value.replace(/[^\d.]/g, ""))}
              inputMode="decimal"
              placeholder="4.5"
              className="w-full bg-transparent text-white outline-none"
            />
            <span className="whitespace-nowrap text-slate-400">LPA</span>
          </div>
          {salaryPreview ? (
            <p className="mt-2 text-xs text-cyan-300">Will save as {salaryPreview}</p>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#031018] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 md:w-fit"
        >
          {submitting ? "Working…" : "Add placement"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-cyan-300">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07111f]/70"
          >
            {item.imageUrl ? (
              <div className="relative mx-auto aspect-[9/16] w-full max-w-sm bg-black/40">
                <UploadedMedia
                  src={item.imageUrl}
                  mediaType={item.mediaType}
                  alt={item.companyName || "Placement"}
                  fill
                />
              </div>
            ) : null}
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                {item.imageUrl ? (isVideoMedia(item) ? "Video" : "Photo") : "Details only"}
              </p>
              {item.companyName ? (
                <h2 className="mt-2 text-lg font-semibold text-white">{item.companyName}</h2>
              ) : null}
              {item.course ? (
                <p className="mt-1 text-sm text-cyan-300">{item.course}</p>
              ) : null}
              {item.salary ? <p className="mt-2 text-sm text-slate-400">{item.salary}</p> : null}
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
            <h2 className="text-xl font-semibold text-white">Edit placement</h2>
            <div className="mt-5 space-y-4">
              <input
                value={editCompanyName}
                onChange={(event) => setEditCompanyName(event.target.value)}
                placeholder="Company name"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white"
              />
              <input
                value={editCourse}
                onChange={(event) => setEditCourse(event.target.value)}
                placeholder="Course"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white"
              />
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-slate-400">₹</span>
                <input
                  value={editSalaryAmount}
                  onChange={(event) =>
                    setEditSalaryAmount(event.target.value.replace(/[^\d.]/g, ""))
                  }
                  placeholder="4.5"
                  className="w-full bg-transparent text-white outline-none"
                />
                <span className="text-slate-400">LPA</span>
              </div>
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
                className="inline-flex rounded-full border border-cyan-300/40 px-5 py-2.5 text-sm text-cyan-200"
              >
                {editFile
                  ? `Replace with: ${editFile.name}`
                  : "Replace photo or video"}
              </button>
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
        title="Remove placement?"
        message="This placement story will be permanently removed from the public placements page."
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => void confirmRemove()}
      />
    </div>
  );
}
