import {
  AccessDeniedError,
  BadRequestError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { AiService } from "./../../domain/services/ai.service";

export class AiServiceImpl implements AiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string,
  ) {}

  async generateResponse(prompt: AiService.Params): Promise<AiService.Model> {
    let httpResponse = await this.httpClient.request({
      url: `${this.baseUrl}?prompt=${prompt}`,
      method: "get",
    });

    const result = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        return result?.response ?? "";
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
