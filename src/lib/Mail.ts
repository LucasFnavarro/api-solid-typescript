import ndoemailer from "nodemailer";
import { mailConfigOptions } from "../config/mail.ts";

export default ndoemailer.createTransport(mailConfigOptions);
