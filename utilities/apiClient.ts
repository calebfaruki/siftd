import cookieManager from "./cookieManager";
import generateUserAgent from "./generateUserAgent";
const BASE_URL = "https://siftd.net/api";

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  domain?: string;
  version?: string;
  expires?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export interface Cookies {
  [key: string]: Cookie;
}

export async function request(
  endpoint: string,
  method = "GET",
  body: any = null
) {
  const headers: Record<any, string> = {
    "User-Agent": await generateUserAgent(),
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "fr-FR,en-US;q=0.7,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  };
  let cookies = await cookieManager.get();
  if (cookies) {
    headers["Cookies"] = cookies;
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
): Promise<[string | null, IUser | undefined]> {
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
  const cookies: string | null = response.headers.get("Set-Cookie");
  const responseData = await response.json();
  const user: IUser | undefined = responseData.user;
  return [cookies, user];
}
