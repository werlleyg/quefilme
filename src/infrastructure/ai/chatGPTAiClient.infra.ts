import { AiClient, AiPrompt, AiResponse } from "@/data/protocols/ai";
import { G4F } from "g4f";

export class ChatGPTAiClient implements AiClient {
  async chat(prompt: AiPrompt): Promise<AiResponse> {
    const g4f = new G4F();
    const messages = [{ role: "user", content: prompt }];
    const options = {
      provider: g4f.providers.GPT,
      model: "gpt-3.5-turbo",
      debug: true,
      proxy: "",
    };

    const response = await g4f.chatCompletion(messages, options);

    return response;
  }
}
