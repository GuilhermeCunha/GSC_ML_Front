export const TOKEN_KEY = "@token";
export const EMAIL_KEY = "@email"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdmin = () => localStorage.getItem(EMAIL_KEY) === "gscdevelops@gmail.com";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};