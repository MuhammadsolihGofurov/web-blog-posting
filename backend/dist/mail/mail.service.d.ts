export declare class MailService {
    private transporter;
    constructor();
    sendVerificationEmail(to: string, token: string): Promise<void>;
}
