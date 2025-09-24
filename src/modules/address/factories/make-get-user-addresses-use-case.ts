import { PrismaAddressRepository } from "../repositories/prisma/prisma-address-repository.js";
import { GetUserAddressesUseCase } from "../use-cases/get-user-addresses.use-case.js";

export function makeGetAllAddressesUserUseCase() {
  const prismaAddressUseCase = new PrismaAddressRepository();
  const getAllAddressesUser = new GetUserAddressesUseCase(prismaAddressUseCase);

  return getAllAddressesUser;
}
