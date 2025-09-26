export class ProductBySlugError extends Error {
  constructor() {
    super("Não encontramos nenhum produto com o SLUG especificado.");
  }
}
