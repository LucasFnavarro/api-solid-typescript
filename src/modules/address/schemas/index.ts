import { z } from "zod";

export const registerAddressesBodySchema = z.object({
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});
