import { env } from "../env/index.ts";

export const mailConfigOptions = {
    host: env.MAILTRAP_HOST,
    port: env.MAILTRAP_PORT,
    auth: {
        user: env.MAILTRAP_USER,
        pass: env.MAILTRAP_PASS
    }
}