import { ChatGPTAiClient } from "@/infrastructure/ai/chatGPTAiClient.infra";

export const makeChatGptAiClient = (): ChatGPTAiClient => new ChatGPTAiClient();
