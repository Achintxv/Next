import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { normalizeStatus } from "@/utils/status";

export default function StatusBadge({ status }) {
  const str = normalizeStatus(status);

  if (str === "closed" || str === "done" || str === "completed" || str === "resolved") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
        <CheckCircle2 size={12} />
        Closed
      </span>
    );
  }

  if (str === "inprogress" || str === "doing" || str === "inreview") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[11px] font-medium text-blue-400">
        <Clock size={12} />
        In Progress
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-medium text-amber-400">
      <AlertCircle size={12} />
      Open
    </span>
  );
}