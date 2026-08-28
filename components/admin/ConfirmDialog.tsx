"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Remove",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#020611]/75 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#07111f] p-6 shadow-[0_0_80px_rgba(34,211,238,0.12)]"
      >
        <h2 id="confirm-dialog-title" className="text-xl font-semibold text-white">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">{message}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-rose-400 px-5 py-2.5 text-sm font-semibold text-[#2a0a0f] transition hover:bg-rose-300"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
