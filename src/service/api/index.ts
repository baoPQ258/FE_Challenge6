import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.API_URL,
  headers: { "Content-Type": "application/json", "accept-language": "en" },
};

const axiosInstance: AxiosInstance = axios.create(config);

export type getDataType = {
  url: string;
  params?: string;
  options?: [];
};

export function getData({ url, params, options }: getDataType) {
  return axiosInstance.get(url, {
    params,
    ...options,
  });
}
