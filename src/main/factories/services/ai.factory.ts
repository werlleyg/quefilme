import { AiService } from "@/domain/services";
import { makeAxiosHttpClient } from "../http/axiosHttpClient.factory";
import { Environment } from "@/main/config";
import { AiServiceImpl } from "@/infrastructure/services";

export const makeAiService = (): AiService =>
  new AiServiceImpl(makeAxiosHttpClient(), Environment.baseUrlAi);
