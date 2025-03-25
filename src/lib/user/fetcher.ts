type RequestData = Record<string, unknown> | FormData;

const CREDENTIALS: RequestCredentials = "include";

async function fetcher(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  data?: RequestData,
  options: Omit<RequestInit, "method" | "body"> = {},
) {
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

export const get = (url: string, options?: Omit<RequestInit, "method">) =>
  fetcher(url, "GET", undefined, options);

export const post = <T extends RequestData>(
  url: string,
  data?: T,
  options?: Omit<RequestInit, "method" | "body">,
) => fetcher(url, "POST", data, options);

export const patch = <T extends RequestData>(
  url: string,
  data?: T,
  options?: Omit<RequestInit, "method" | "body">,
) => fetcher(url, "PATCH", data, options);

export const del = (url: string, options?: Omit<RequestInit, "method">) =>
  fetcher(url, "DELETE", undefined, options);
