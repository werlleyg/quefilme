import { AiService } from "@/domain/services";
import { AxiosHttpClient } from "@/infrastructure/http";
import { AiServiceImpl } from "@/infrastructure/services";
import { Environment } from "@/main/config";

type SutTypes = {
  axiosHttpClient: AxiosHttpClient;
  sut: AiService;
};

const makeSut = (): SutTypes => {
  const axiosHttpClient = new AxiosHttpClient();
  const sut = new AiServiceImpl(axiosHttpClient, Environment.baseUrlAi);
  return {
    sut,
    axiosHttpClient,
  };
};

describe("makeAiService factory", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(AiServiceImpl);
  });
});
