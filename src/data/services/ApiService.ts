import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiLinksInterface } from "data/@types/ApiLinksInterface";
import { LocalStorage } from "./StorageService";

const baseUrl = process.env.NEXT_PUBLIC_API;

export const ApiService = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid"
    ) {
      handleTokenRefresh(error);
    }

    return Promise.reject(error);
  }
);

async function handleTokenRefresh(error: { config: AxiosRequestConfig }) {
  const tokenRefresh = LocalStorage.get("token_refresh", "");

  if (tokenRefresh) {
    LocalStorage.clear("token_refresh");
    LocalStorage.clear("token");

    try {
      const { data } = await ApiService.post<{
        access: string;
        refresh: string;
      }>("/auth/token/refresh/", {
        refresh: tokenRefresh,
      });
      LocalStorage.set("token_refresh", data.refresh);
      LocalStorage.set("token", data.access);

      ApiService.defaults.headers.common.Authorization = `Bearer ${data.access}`;

      error.config.headers!.Authorization = `Bearer ${data.access}`;

      return ApiService(error.config);
    } catch (error) {
      return error;
    }
  }
}

export function linksResolver(
  links: ApiLinksInterface[] = [],
  nomeLink: string
) {
  return links.find((link) => link.rel === nomeLink);
}

export function ApiServiceHateoas(
  links: ApiLinksInterface[] = [],
  nome: string,
  onCanRequest: (
    request: <T>(data?: AxiosRequestConfig) => Promise<AxiosResponse<T>>
  ) => void,
  onCantRequest?: Function
) {
  const link = linksResolver(links, nome);

  if (link) {
    onCanRequest(async (data) => {
      return await ApiService.request({
        url: link.uri,
        method: link.type,
        ...data,
      });
    });
  } else {
    onCantRequest?.();
  }
}
