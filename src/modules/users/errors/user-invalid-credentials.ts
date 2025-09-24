export class UserInvalidCredentialsError extends Error {
  constructor() {
    super("E-mail ou password incorreto");
  }
}
