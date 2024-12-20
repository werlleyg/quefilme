export const Environment = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.omdbapi.com/",
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY ?? "15778c95",
  baseUrlAi:
    process.env.NEXT_PUBLIC_BASE_URL_AI ?? "http://127.0.0.1:3000/api/chat",
  debounceTime: Number(process.env.DEBOUNCE_TIME) ?? 1,
};
