import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useLayoutEffect, useState } from "react";
import { getCurrentUserApi, loginUserApi, logoutUserApi, registerUserApi } from "../api/AuthApi";
import { SignUpData, UserData } from "../Types";
import { apiClient } from "../lib/ApiClient";
import { InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type authContextType = {
  user: UserData;
  userLoading: boolean;

  registerUser: (data: SignUpData) => void;
  registerLoading: boolean;

  loginUser: (data: SignUpData) => void;
  loginLoading: boolean;

  logoutUser: () => void;
  logoutLoading: boolean;
};

export const AuthContext = React.createContext<authContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(undefined);

  const { data: user, isFetching: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });

  const { mutate: registerUser, isPending: registerLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUserApi,
  });

  const { mutate: loginUser, isPending: loginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { mutate: logoutUser, isPending: logoutLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });

  useLayoutEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      config.headers.Authorization = token && !config._retry ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response.status === 401) {
          originalRequest._retry = true;

          try {
            const response = await apiClient.post("/auth/refresh-token");
            const newAccessToken = response.data.accessToken;
            setToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
          } catch {
            setToken(undefined);
            logoutUser();
          }
        }
        return Promise.reject(error.response.data);
      }
    );
    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, userLoading, loginLoading, loginUser, logoutLoading, logoutUser, registerLoading, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as authContextType;
};
