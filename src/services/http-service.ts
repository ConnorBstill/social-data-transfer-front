import { Response } from "@/lib/types";

export const get = async (
  url: string,
  headers?: HeadersInit,
): Promise<Response<object>> => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      ...headers,
    },
  });

  return res.json();
};

export const post = async (
  url: string,
  body: BodyInit,
  headers?: HeadersInit,
): Promise<Response<object>> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
    },
    body,
  });

  return res.json();
};

export const put = async (
  url: string,
  body: BodyInit,
  headers?: HeadersInit,
): Promise<Response<object>> => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body,
  });

  return res.json();
};

export const remove = async (
  url: string,
  headers?: HeadersInit,
): Promise<Response<object>> => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { ...headers },
  });

  return res.json();
};
