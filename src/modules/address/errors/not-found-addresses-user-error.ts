export class NotFoundAddressesUserError extends Error {
  constructor() {
    super("Parece que você ainda não cadastrou nenhum endereço.");
  }
}
