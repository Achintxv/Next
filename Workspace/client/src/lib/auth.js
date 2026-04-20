//manages cookies
export const setToken = (token) => {
  document.cookie = `token=${token}; path=/`;
};

export const getToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
};

export const removeToken = () => {
  document.cookie = "token=; Max-Age=0; path=/";
};