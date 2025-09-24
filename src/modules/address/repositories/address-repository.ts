import type { Address, Prisma } from "../../../../generated/prisma/index.js";

export interface IAddressInterface {
  crete(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;
  getByUserId(userId: string): Promise<Address[]>;
}
