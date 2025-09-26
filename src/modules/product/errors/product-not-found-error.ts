export class ProductNotFoundError extends Error {
  constructor() {
    super("Nenhum produto foi encontrado.");
  }
}
