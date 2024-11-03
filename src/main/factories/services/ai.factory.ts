import { AiServiceImpl } from "@/data/services";
import { AiService } from "@/domain/services";
import { makeAxiosHttpClient } from "../http/axiosHttpClient.factory";
import { Environment } from "@/main/config";

export const makeAiService = (): AiService =>
  new AiServiceImpl(makeAxiosHttpClient(), Environment.baseUrlAi);
