export class UserAlreadyExistsError extends Error {
  constructor() {
    super("O e-mail informado já está em uso!");
  }
}
