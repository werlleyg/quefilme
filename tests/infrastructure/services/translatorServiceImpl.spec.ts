import { HttpClientSpy, mockTranslatorResponse } from "../mocks";
import { Environment } from "@/main/config";
import { HttpStatusCode } from "@/domain/protocols/http";
import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { TranslatorServiceImpl } from "@/infrastructure/services/translatorImpl.service";
import { languagesEnum } from "@/domain/enums/languages.enum";

type SutTypes = {
  httpClientSpy: HttpClientSpy;
  baseUrl: string;
  key: string;
  sut: TranslatorServiceImpl;
};

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const baseUrl = "http:test-url.com";
  const key = "test-key";
  const sut = new TranslatorServiceImpl(httpClientSpy, baseUrl, key);

  return { sut, httpClientSpy, baseUrl, key };
};

const makeUrlWithKey = () => {
  const { baseUrl, key } = makeSut();
  return `${baseUrl}/language/translate/v2?key=${key}`;
};

describe("TranslatorServiceImpl", () => {
  const titleMock = "Guardians of the Galaxy Vol. 2";
  const translatedTitleMock = "guardiões da galaxia vol. 2";

  const paramsMock = {
    query: titleMock.trim().toLowerCase(),
    source: languagesEnum.PTBR,
    target: languagesEnum.EN,
  };

  describe("translator", () => {
    test("Should translator with correct params", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.ok,
        body: mockTranslatorResponse,
      };

      const result = await sut.translator(paramsMock);

      expect(httpClientSpy.url).toBe(makeUrlWithKey());
      expect(httpClientSpy.method).toBe("post");
      expect(result).toBe(
        mockTranslatorResponse.data.translations[0].translatedText,
      );
    });

    test("Should throw BadRequestError if returns status code 400", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.badRequest,
        body: {},
      };

      await expect(sut.translator(paramsMock)).rejects.toThrow(
        new BadRequestError(),
      );
    });

    test("Should throw NotFoundError if returns status code 404", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.notFound,
        body: {},
      };

      await expect(sut.translator(paramsMock)).rejects.toThrow(
        new NotFoundError(),
      );
    });

    test("Should throw UnexpectedError if returns status code 500", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.serverError,
        body: {},
      };

      await expect(sut.translator(paramsMock)).rejects.toThrow(
        new UnexpectedError(),
      );
    });
  });
});
