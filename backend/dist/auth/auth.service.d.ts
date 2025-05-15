import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private emailService;
    constructor(usersService: UsersService, jwtService: JwtService, emailService: MailService);
    validateUser(username: string, password: string): Promise<any>;
    confirmEmail(token: string): Promise<{
        message: string;
    }>;
    login(user: any): Promise<{
        access_token: string;
        username: any;
        _id: any;
        role: any;
        email: any;
    }>;
    register(username: string, password: string, email: string): Promise<{
        message: string;
    }>;
    createAdmin(username: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("../users/user.schema").UserDocument, {}> & import("../users/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteByEmail(email: string): Promise<void>;
}
