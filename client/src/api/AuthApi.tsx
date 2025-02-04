import { apiClient } from "../lib/ApiClient";
import { SignUpData } from "../Types";

export const registerUserApi = async (data: SignUpData) => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};

export const loginUserApi = async (data: SignUpData) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const logoutUserApi = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await apiClient.get("/auth/user");
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await apiClient.post("/auth/refresh-token");
  return response.data;
};
