import { AxiosHttpClient } from "@/infrastructure/http";

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  return {
    sut,
  };
};

describe("makeAxiosHttpClient factory", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(AxiosHttpClient);
  });
});
