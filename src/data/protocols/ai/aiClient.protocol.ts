export type AiPrompt = string;

export type AiResponse = string;

export interface AiClient {
  chat: (prompt: AiPrompt) => Promise<AiResponse>;
}
