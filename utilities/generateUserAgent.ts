import Constants from "expo-constants";

export default async function generateUserAgent(): Promise<string> {
  const webViewUserAgent = await Constants.getWebViewUserAgentAsync();
  return webViewUserAgent as string;
}
