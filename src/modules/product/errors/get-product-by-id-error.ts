export class GetProductByIdError extends Error {
  constructor() {
    super("Não encontramos nenhum produto com o ID especificado.");
  }
}
