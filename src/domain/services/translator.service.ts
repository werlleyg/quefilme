import { languagesEnum } from "../enums/languages.enum";

export interface TranslatorService {
  translator: (
    params: TranslatorService.Params,
  ) => Promise<TranslatorService.Model>;
}

export namespace TranslatorService {
  export type Params = {
    query: string;
    target: languagesEnum;
    source: languagesEnum;
  };
  export type Model = string;
}
