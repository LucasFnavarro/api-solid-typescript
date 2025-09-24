export class UserSNotFoundError extends Error {
  constructor() {
    super("Não encontramos nenhum usuário.");
  }
}
