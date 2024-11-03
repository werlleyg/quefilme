import { AiServiceImpl } from "@/data/services";
import { HttpClientSpy, mockGenerateResponse } from "../mocks";
import { Environment } from "@/main/config";
import { HttpStatusCode } from "@/data/protocols/http";
import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";

type SutTypes = {
  sut: AiServiceImpl;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new AiServiceImpl(httpClientSpy, Environment.baseUrlAi);

  return { sut, httpClientSpy };
};

const promptMock =
  "Seja direto e siga exatamente o modelo propost, me indique um filme baseado na lista Um amor para recordar, PS Eu te amo, Ponte para terabitia e coloque seu imdb no final, ex: Vingadores ultimato - 255fd";

const makeUrlWithPromp = (prompt?: string) =>
  `${Environment.baseUrlAi}?prompt=${prompt}`;

describe("AiServiceImpl", () => {
  describe("generateResponse", () => {
    test("Should genereate response with correct prompt", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.ok,
        body: mockGenerateResponse,
      };

      const result = await sut.generateResponse(promptMock);

      expect(httpClientSpy.url).toBe(makeUrlWithPromp(promptMock));
      expect(httpClientSpy.method).toBe("get");
      expect(result).toBe(mockGenerateResponse.response);
    });

    test("Should throw BadRequestError if returns status code 400", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.badRequest,
        body: {},
      };

      await expect(sut.generateResponse(promptMock)).rejects.toThrow(
        new BadRequestError(),
      );
    });

    test("Should throw NotFoundError if returns status code 404", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.notFound,
        body: {},
      };

      await expect(sut.generateResponse(promptMock)).rejects.toThrow(
        new NotFoundError(),
      );
    });

    test("Should throw UnexpectedError if returns status code 500", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.serverError,
        body: {},
      };

      await expect(sut.generateResponse(promptMock)).rejects.toThrow(
        new UnexpectedError(),
      );
    });
  });
});
