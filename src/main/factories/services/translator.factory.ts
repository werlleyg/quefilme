import { TranslatorService } from "@/domain/services/translator.service";
import { TranslatorServiceImpl } from "@/infrastructure/services/translatorImpl.service";
import { makeAxiosHttpClient } from "../http/axiosHttpClient.factory";
import { Environment } from "@/main/config";

export const makeTranslatorService = (): TranslatorService =>
  new TranslatorServiceImpl(
    makeAxiosHttpClient(),
    Environment.baseUrlTranslator,
    Environment.translatorKey,
  );
