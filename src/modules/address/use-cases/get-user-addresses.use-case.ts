import { NotFoundAddressesUserError } from "../errors/not-found-addresses-user-error.js";
import type { IAddressInterface } from "../repositories/address-repository.js";

interface GetUserAddressesResponse {
  user_id: string;
}

export class GetUserAddressesUseCase {
  constructor(private addressRepository: IAddressInterface) {}

  async execute({ user_id }: GetUserAddressesResponse) {
    const userAddresses = await this.addressRepository.getByUserId(user_id);

    if (!userAddresses || userAddresses.length === 0) {
      throw new NotFoundAddressesUserError();
    }

    return {
      userAddresses,
    };
  }
}
