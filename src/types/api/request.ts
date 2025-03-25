export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export type HttpMethod = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];

export type RequestData = Record<string, unknown> | FormData;

export interface RequestConfig extends Omit<RequestInit, "method" | "body"> {
  credentials?: RequestCredentials;
  headers?: HeadersInit;
}
