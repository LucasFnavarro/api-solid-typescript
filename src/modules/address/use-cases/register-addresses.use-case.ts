import type { Address } from "../../../../generated/prisma/index.js";
import { ErrorCreatedAddressesUserError } from "../errors/error-created-addresses-user-error.js";
import type { IAddressInterface } from "../repositories/address-repository.js";

interface RegisterAddressUseCaseRequest {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  country: string;
  zipCode: string;
  latitude?: string | null;
  longitude?: string | null;
  user_id: string;
}

interface RegisterAddressUseCaseResponse {
  address: Address;
}

export class RegisterAddressUseCase {
  constructor(private addressRepository: IAddressInterface) {}

  async execute({
    street,
    number,
    neighborhood,
    city,
    country,
    zipCode,
    latitude,
    longitude,
    user_id,
  }: RegisterAddressUseCaseRequest): Promise<RegisterAddressUseCaseResponse> {
    const address = await this.addressRepository.crete({
      street,
      number,
      neighborhood,
      city,
      country,
      zipCode,
      latitude: latitude || null,
      longitude: longitude || null,
      user_id,
    });

    if (!address) {
      throw new ErrorCreatedAddressesUserError();
    }

    return { address };
  }
}
