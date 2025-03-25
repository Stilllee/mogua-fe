import {
  type RequestData,
  type HttpMethod,
  HTTP_METHOD,
  type RequestConfig,
} from "@/types/api";

const CREDENTIALS: RequestCredentials = "include";

async function fetcher(
  url: string,
  method: HttpMethod = HTTP_METHOD.GET,
  data?: RequestData,
  options: RequestConfig = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (data && !(data instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...options,
    method,
    credentials: CREDENTIALS,
    headers,
  };

  if (data) {
    config.body = data instanceof FormData ? data : JSON.stringify(data);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return fetch(`${baseUrl}${url}`, config);
}

export const get = (url: string, options?: RequestConfig) =>
  fetcher(url, HTTP_METHOD.GET, undefined, options);

export const post = (
  url: string,
  data?: RequestData,
  options?: RequestConfig,
) => fetcher(url, HTTP_METHOD.POST, data, options);

export const patch = (
  url: string,
  data?: RequestData,
  options?: RequestConfig,
) => fetcher(url, HTTP_METHOD.PATCH, data, options);

export const del = (url: string, options?: RequestConfig) =>
  fetcher(url, HTTP_METHOD.DELETE, undefined, options);
