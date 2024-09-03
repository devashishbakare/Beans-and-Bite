export const baseUrl = "http://localhost:8000";
export const createHeader = (token) => {
  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
