import { ChatGPTAiClient } from "@/infrastructure/ai/chatGPTAiClient.infra";
import { makeChatGptAiClient } from "@/main/factories/ai/chatGPTAiClient.factory";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query, method } = req;

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { prompt } = query;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({ error: "Put a valid prompt" });
  }

  const response = await makeChatGptAiClient().chat(prompt as string);
  res.status(200).json({ response: decodeURI(response) });
  return;
}
