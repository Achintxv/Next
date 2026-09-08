import { Loader2, ArrowUpRight, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function IssueList({
  issues,
  loading,
  filter,
  setFilter,
  onSelectIssue,
  onDeleteIssue,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-base font-semibold text-zinc-200">Issues</h3>

        <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-1">
          {["ALL", "OPEN", "IN-PROGRESS", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                filter === st ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {st === "IN-PROGRESS" ? "In Progress" : st.charAt(0) + st.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-xs">Loading issues...</span>
        </div>
      ) : issues.length === 0 ? (
        <div className="py-12 text-center text-zinc-500">
          <p className="text-sm">No issues found for this project.</p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-800/60">
          {issues.map((issue) => (
            <div
              key={issue._id || issue.id}
              onClick={() => onSelectIssue(issue)}
              className="group flex cursor-pointer items-center justify-between px-3 py-3.5 transition hover:bg-zinc-800/30 rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <StatusBadge status={issue.status} />
                <span className="truncate text-sm font-medium text-zinc-200 group-hover:text-white">
                  {issue.title || issue.name}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs text-zinc-500">
                {issue.priority && (
                  <span className="capitalize text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/40">
                    {String(issue.priority).toLowerCase()}
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteIssue(issue._id || issue.id);
                  }}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition"
                  title="Delete Issue"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}