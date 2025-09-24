export class NotAllowedError extends Error {
  constructor() {
    super("Você não tem permissão para excluir esta conta.");
  }
}
