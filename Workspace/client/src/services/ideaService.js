import api from "@/lib/api";

export const getIdeas = () => api.get("/ideas");
export const createIdea = (text) => api.post("/ideas", { text });
export const updateIdea = (id, status) =>
  api.put(`/ideas/${id}`, { status });
export const deleteIdea = (id) =>
  api.delete(`/ideas/${id}`);