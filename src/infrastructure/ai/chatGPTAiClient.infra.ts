import { AiClient, AiPrompt, AiResponse } from "@/data/protocols/ai";
import { chunkProcessor, G4F } from "g4f";

export class ChatGPTAiClient implements AiClient {
  async chat(prompt: AiPrompt): Promise<AiResponse> {
    const g4f = new G4F();
    const messages = [{ role: "user", content: prompt }];
    const options = {
      provider: g4f.providers.Bing,
      // model: "gpt-4",
      // debug: true,
      stream: true,
      // proxy: "",
      chunkSize: 15,
    };

    try {
      const response = await g4f.chatCompletion(messages, options);
      let text = "";
      for await (const chunk of chunkProcessor(response)) {
        text += chunk;
      }

      return text;
    } catch (error) {
      console.error("Error getting response from GPT:", error);
      throw new Error("Failed to communicate with the AI service.");
    }
  }
}
