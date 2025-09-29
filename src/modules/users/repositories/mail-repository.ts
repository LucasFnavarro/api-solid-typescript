export interface IMailRepository {
  sendMail(options: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }): Promise<void>;
}
