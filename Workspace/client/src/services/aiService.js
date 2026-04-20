import api from "@/lib/api";

export const askAI = (data) => api.post("/ai", data);