import { User } from "../types";
import * as cookies from "./cookies";
const BASE_URL = "https://siftd.net/api";

export async function request(
  endpoint: string,
  method = "GET",
  body: any = null
) {
  const headers: Record<any, any> = {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
  const cookie = await cookies.get();
  if (cookie) {
    headers["Cookie"] = cookie;
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body,
  });
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return await response.json();
}

export async function login(
  email: string,
  password: string
): Promise<[string | null, User | undefined]> {
  const data: string = `method=user&action=login&ue=${encodeURIComponent(
    email.toLowerCase()
  )}&up=${encodeURIComponent(password)}`;
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error("API request failed");
  }
  const cookie = response.headers.get("Set-Cookie");
  const responseData = await response.json();
  const user: User | undefined = responseData.user;
  return [cookie, user];
}
