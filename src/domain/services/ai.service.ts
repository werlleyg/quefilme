export interface AiService {
  generateResponse: (prompt: AiService.Params) => Promise<AiService.Model>;
}

export namespace AiService {
  export type Params = string;
  export type Model = string;
}
