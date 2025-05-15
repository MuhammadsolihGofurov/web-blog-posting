import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        message: string;
    }>;
    confirmEmail(token: string): Promise<{
        message: string;
    }>;
    login(body: any): Promise<{
        access_token: string;
        username: any;
        _id: any;
        role: any;
        email: any;
    }>;
    createAdmin(body: any): Promise<import("mongoose").Document<unknown, {}, import("../users/user.schema").UserDocument, {}> & import("../users/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
