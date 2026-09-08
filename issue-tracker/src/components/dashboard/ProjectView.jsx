"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertCircle, CheckCircle2, Clock, ListTodo, Plus } from "lucide-react";
import { matchesStatus } from "@/utils/status";
import IssueModal from "../IssueModal";
import IssueList from "../IssueList";

export default function ProjectView({ project }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  const fetchIssues = useCallback(async () => {
    if (!project?._id) return;
    setLoading(true);

    try {
      const query = new URLSearchParams({
        project: project._id,
        projectId: project._id,
        project_id: project._id,
      }).toString();

      const res = await fetch(`/api/issue?${query}`);
      const rawData = await res.json();

      if (!res.ok) {
        setIssues([]);
        return;
      }

      let list = Array.isArray(rawData)
        ? rawData
        : rawData.issues || rawData.data || rawData.results || [];

      const targetId = String(project._id);
      const matchesProject = list.filter((item) => {
        const itemProj = item.project || item.projectId || item.project_id;
        const itemProjId = typeof itemProj === "object" ? itemProj?._id : itemProj;
        return String(itemProjId) === targetId;
      });

      setIssues(matchesProject.length > 0 ? matchesProject : list);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }, [project?._id]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // Create handler
  const handleCreateIssue = async (formData) => {
    const payload = {
      ...formData,
      status: formData.status.toLowerCase(),
      priority: formData.priority.toLowerCase(),
      project: project._id,
      projectId: project._id,
      project_id: project._id,
    };

    const res = await fetch("/api/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || "Failed to create issue");

    await fetchIssues();
  };

  // Edit handler
  const handleUpdateIssue = async (formData) => {
  const issueId = editingIssue._id || editingIssue.id;

  const payload = {
    title: formData.title,
    description: formData.description,
    status: formData.status.toLowerCase(),
    priority: formData.priority.toLowerCase(),
  };

  const res = await fetch(`/api/issue/${issueId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || "Failed to update issue");
  }

  await fetchIssues();
};

const handleDeleteIssue = async (issueId) => {
  if (!confirm("Are you sure you want to delete this issue?")) return;

  try {
    const res = await fetch(`/api/issue/${issueId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || "Failed to delete issue");
    }

    await fetchIssues();
  } catch (err) {
    console.error("Delete issue error:", err);
    alert(err.message || "Failed to delete issue");
  }
};

  // Metrics
  const openIssues = issues.filter((i) => matchesStatus(i.status, "OPEN"));
  const inProgressIssues = issues.filter((i) => matchesStatus(i.status, "IN-PROGRESS"));
  const closedIssues = issues.filter((i) => matchesStatus(i.status, "CLOSED"));

  const total = issues.length;
  const openPct = total ? Math.round((openIssues.length / total) * 100) : 0;
  const inProgressPct = total ? Math.round((inProgressIssues.length / total) * 100) : 0;
  const closedPct = total ? Math.round((closedIssues.length / total) * 100) : 0;

  const filteredIssues = issues.filter((issue) => {
    if (filter === "ALL") return true;
    return matchesStatus(issue.status, filter);
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-zinc-800/80 border border-zinc-700/50 px-2 py-0.5 text-xs font-mono font-medium text-zinc-300">
              {project.key}
            </span>
            <span className="text-xs text-zinc-500">Project Overview</span>
          </div>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-zinc-100">{project.name}</h2>
          <p className="mt-1 text-sm text-zinc-400 max-w-xl">
            {project.description || "No description provided for this project."}
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-blue-500 shadow-lg shrink-0"
        >
          <Plus size={16} /> Create Issue
        </button>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Issues</span>
            <ListTodo size={18} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-zinc-100">{total}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider text-amber-400">Open</span>
            <AlertCircle size={18} className="text-amber-400/80" />
          </div>
          <p className="mt-3 text-3xl font-bold text-zinc-100">{openIssues.length}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider text-blue-400">In Progress</span>
            <Clock size={18} className="text-blue-400/80" />
          </div>
          <p className="mt-3 text-3xl font-bold text-zinc-100">{inProgressIssues.length}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">Closed</span>
            <CheckCircle2 size={18} className="text-emerald-400/80" />
          </div>
          <p className="mt-3 text-3xl font-bold text-zinc-100">{closedIssues.length}</p>
        </div>
      </div>

      {/* DISTRIBUTION BAR */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-zinc-200">Status Distribution</h3>
          <span className="text-xs text-zinc-500">{closedPct}% Completed</span>
        </div>

        <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-800/60 p-0.5">
          <div style={{ width: `${openPct}%` }} className="bg-amber-500 transition-all duration-500" />
          <div style={{ width: `${inProgressPct}%` }} className="bg-blue-500 transition-all duration-500" />
          <div style={{ width: `${closedPct}%` }} className="bg-emerald-500 transition-all duration-500" />
        </div>
      </div>

      {/* ISSUES LIST */}
      <IssueList
        issues={filteredIssues}
        loading={loading}
        filter={filter}
        setFilter={setFilter}
        onSelectIssue={(issue) => setEditingIssue(issue)}
        onDeleteIssue={handleDeleteIssue}
      />

      {/* MODALS */}
      <IssueModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateIssue}
        title="Create New Issue"
      />

      <IssueModal
        isOpen={Boolean(editingIssue)}
        onClose={() => setEditingIssue(null)}
        onSubmit={handleUpdateIssue}
        initialData={editingIssue}
        title="Edit Issue"
      />
    </div>
  );
}