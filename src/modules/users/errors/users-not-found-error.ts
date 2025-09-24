export class UsersNotFoundError extends Error {
  constructor() {
    super("Não encontramos nenhum usuário.");
  }
}
