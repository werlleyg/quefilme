export class BadRequestError extends Error {
  constructor() {
    super("Requisição inválida!");
    this.name = "BadRequestError";
  }
}
