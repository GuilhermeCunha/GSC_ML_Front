export const TOKEN_KEY = "@token";
export const EMAIL_KEY = "@email"
export const NICKNAME_KEY = "@nickname"
export const ID_KEY = "@id"

export const ISADMIN_KEY = "@isAdmin"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdmin = () => localStorage.getItem(ISADMIN_KEY === 's');
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = data => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ID_KEY, data.id);
  localStorage.setItem(EMAIL_KEY, data.email);
  localStorage.setItem(NICKNAME_KEY, data.nickname);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ID_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(NICKNAME_KEY);
  localStorage.removeItem(ISADMIN_KEY);
};

