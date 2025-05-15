"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    emailService;
    constructor(usersService, jwtService, emailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Login yoki parol noto‘g‘ri');
        }
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('Email tasdiqlanmagan');
        }
        const { password: hashedPassword, ...result } = user.toObject();
        return result;
    }
    async confirmEmail(token) {
        const user = await this.usersService.findByVerifyToken(token);
        if (!user) {
            throw new common_1.NotFoundException('Noto‘g‘ri yoki eskirgan token');
        }
        if (user.isVerified == 'active') {
            return { message: 'Email allaqachon tasdiqlangan' };
        }
        user.isVerified = 'active';
        user.verifyToken = null;
        await user.save();
        return { message: 'Email muvaffaqiyatli tasdiqlandi' };
    }
    async login(user) {
        const existingUser = await this.usersService.findUserByEmail(user.email);
        const payload = { username: user.username, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            username: user.username,
            _id: user._id,
            role: user.role,
            email: user.email,
        };
    }
    async register(username, password, email) {
        const token = (0, crypto_1.randomBytes)(32).toString('hex');
        const user = await this.usersService.createUserWithEmail(username, password, email, token);
        await this.emailService.sendVerificationEmail(email, token);
        return { message: 'Emailingizga tasdiqlash havolasi yuborildi' };
    }
    async createAdmin(username, password) {
        return this.usersService.createUser(username, password, 'admin');
    }
    async deleteByEmail(email) {
        await this.usersService.deleteByEmail(email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map