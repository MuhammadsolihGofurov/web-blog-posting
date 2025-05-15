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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username });
    }
    async createUser(username, password, role = 'user') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({
            username,
            password: hashedPassword,
            role,
        });
        return createdUser.save();
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async createUserWithEmail(username, password, email, token) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser && existingUser.isVerified === 'in_registration') {
            await this.userModel.deleteOne({ email });
        }
        else if (existingUser) {
            throw new Error('User already exists and is verified or in a different status');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            username,
            password: hashedPassword,
            email,
            isVerified: 'in_registration',
            verifyToken: token,
        });
        return newUser.save();
    }
    async confirmEmail(token) {
        const user = await this.userModel.findOne({
            verifyToken: token,
        });
        if (!user)
            throw new Error('Token noto‘g‘ri yoki allaqachon ishlatilgan');
        user.isVerified = 'active';
        user.verifyToken = null;
        await user.save();
        return { message: 'Email muvaffaqiyatli tasdiqlandi' };
    }
    async deleteByEmail(email) {
        await this.userModel.deleteOne({ email });
    }
    async findByVerifyToken(token) {
        return this.userModel.findOne({ verifyToken: token });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map