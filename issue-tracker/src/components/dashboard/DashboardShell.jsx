"use client";

import { useEffect, useState } from "react";
import { Plus, FolderKanban, LogOut, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectView from "@/components/dashboard/ProjectView";

export default function DashboardShell({ user }) {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", key: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/project");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        setProjects(data.projects || []);

        if (data.projects?.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  function handleProjectSelect(project) {
    setSelectedProject(project);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  async function handleCreateProject(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      const createdProject = data.project || data;
      
      setProjects((prev) => [...prev, createdProject]);
      setSelectedProject(createdProject);
      
      setFormData({ name: "", key: "", description: "" });
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNameChange(e) {
    const name = e.target.value;
    const autoKey = name
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 5);

    setFormData((prev) => ({
      ...prev,
      name,
      key: prev.key === "" || prev.key === autoKey.slice(0, -1) ? autoKey : prev.key,
    }));
  }

  if (loading) {
    return (
      <main className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Loading workspace...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      {/* HEADER - FIXED TOP */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/50 px-6 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-zinc-100">
            Code Diary
          </h1>
          <p className="text-xs text-zinc-400">
            Project Management
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-200">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-zinc-500">
              {user?.email || "user@example.com"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-red-700 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* VIEWPORT CONTAINER */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR - FIXED LEFT (SCROLLS INTERNALLY IF OVERFLOW) */}
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-zinc-800/80 bg-zinc-900/30 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Workspace
              </p>
              <h2 className="mt-0.5 text-lg font-bold text-zinc-200">
                Projects
              </h2>
            </div>

            <button
              onClick={() => {
                setError("");
                setIsModalOpen(true);
              }}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
              title="Create project"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* PROJECT LIST */}
          <div className="space-y-1.5">
            {projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-800 p-5 text-center">
                <FolderKanban size={28} className="mx-auto text-zinc-600" />
                <p className="mt-3 text-xs text-zinc-400">
                  No projects yet
                </p>
                <button
                  onClick={() => {
                    setError("");
                    setIsModalOpen(true);
                  }}
                  className="mt-3 text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Create your first project
                </button>
              </div>
            ) : (
              projects.map((project) => {
                const isSelected = selectedProject?._id === project._id;

                return (
                  <button
                    key={project._id}
                    onClick={() => handleProjectSelect(project)}
                    className={`w-full rounded-xl p-3 text-left transition ${
                      isSelected
                        ? "bg-blue-600/10 border border-blue-500/30 text-blue-400"
                        : "border border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-zinc-800/80 text-zinc-400"
                        }`}
                      >
                        <FolderKanban size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                          {project.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {project.key}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* CONTENT AREA - ONLY THIS AREA SCROLLS */}
        <section className="flex-1 overflow-y-auto bg-zinc-950 p-8">
          {!selectedProject ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <FolderKanban size={44} className="mx-auto text-zinc-700" />
                <h2 className="mt-4 text-lg font-semibold text-zinc-300">
                  Select a project
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Choose a project from the sidebar to view its issues and analytics.
                </p>
              </div>
            </div>
          ) : (
            <ProjectView project={selectedProject} />
          )}
        </section>
      </div>

      {/* CREATE PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-zinc-100">Create New Project</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-400">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Website Redesign"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400">
                  Key (Prefix)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  placeholder="e.g. WEB"
                  value={formData.key}
                  onChange={(e) =>
                    setFormData({ ...formData, key: e.target.value.toUpperCase() })
                  }
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief overview of the project"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}