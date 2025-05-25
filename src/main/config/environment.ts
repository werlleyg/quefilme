export const Environment = {
  baseUrl: process.env.NEXT_PUBLIC_QUEFILME_API_BASE_URL ?? "https://#",
  debounceTime: Number(process.env.DEBOUNCE_TIME) ?? 1,
};
