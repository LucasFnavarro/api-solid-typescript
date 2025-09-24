import type { Prisma, Address } from "../../../../../generated/prisma/index.js";
import { prisma } from "../../../../lib/prismaClient.js";
import type { IAddressInterface } from "../address-repository.js";

export class PrismaAddressRepository implements IAddressInterface {
  async getByUserId(userId: string): Promise<Address[]> {
    return await prisma.address.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async crete(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    return await prisma.address.create({
      data,
    });
  }
}
