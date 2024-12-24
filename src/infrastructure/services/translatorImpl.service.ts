import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/domain/protocols/http";
import { TranslatorService } from "@/domain/services/translator.service";

export class TranslatorServiceImpl implements TranslatorService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string,
    private readonly key: string,
  ) {}

  async translator(
    params: TranslatorService.Params,
  ): Promise<TranslatorService.Model> {
    const body = {
      ...params,
      q: params.query,
    };

    const httpResponse = await this.httpClient.request({
      url: `${this.baseUrl}/language/translate/v2?key=${this.key}`,
      method: "post",
      body,
    });

    const result = httpResponse?.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return result?.data?.translations[0]?.translatedText ?? "";
      }
      case HttpStatusCode.notFound:
        throw new NotFoundError();
      case HttpStatusCode.badRequest:
        throw new BadRequestError();
      default:
        throw new UnexpectedError();
    }
  }
}
