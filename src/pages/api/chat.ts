import { ChatGPTAiClient } from "@/infrastructure/ai/chatGPTAiClient.infra";
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

  const aiClient = new ChatGPTAiClient();
  const response = await aiClient.chat(prompt as string);
  res.status(200).json({ response: decodeURI(response) });
  return;
}