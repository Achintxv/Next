import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
  localStorage.removeItem("token");

  // ❗ remove cookie
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  set({ user: null, token: null });
},
}));