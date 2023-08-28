export default function ensureHttps(url: string) {
  if (url.startsWith("//")) {
    return "https:" + url;
  }
  return url;
}
