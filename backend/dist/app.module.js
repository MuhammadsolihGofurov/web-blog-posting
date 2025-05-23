"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const blog_module_1 = require("./blog/blog.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://gofurovmuhammadsolih004:FnGPvErCF3GQgXlo@backend.a9tdunb.mongodb.net/?retryWrites=true&w=majority&appName=backend'), users_module_1.UsersModule, auth_module_1.AuthModule, blog_module_1.BlogModule,],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map