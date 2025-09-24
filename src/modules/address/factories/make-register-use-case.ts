import { PrismaAddressRepository } from "../repositories/prisma/prisma-address-repository.js";
import { RegisterAddressUseCase } from "../use-cases/register-addresses.use-case.js";

export function makeRegisterAddressUseCase() {
  const prismaAddressUseCase = new PrismaAddressRepository();
  const registerAddress = new RegisterAddressUseCase(prismaAddressUseCase);

  return registerAddress;
}
