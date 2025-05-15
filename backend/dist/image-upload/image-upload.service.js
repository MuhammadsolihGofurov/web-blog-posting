"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs = require("fs");
let ImageUploadService = class ImageUploadService {
    apiKey = 'e7c744b30da049109b7bce4365417512';
    async uploadImage(filePath) {
        const imageBuffer = fs.readFileSync(filePath);
        const base64Image = imageBuffer.toString('base64');
        const params = new URLSearchParams();
        params.append('image', base64Image);
        const response = await axios_1.default.post(`https://api.imgbb.com/1/upload?key=${this.apiKey}`, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return {
            image: response?.data?.data?.image,
            thumb: response?.data?.data?.thumb,
            delete_url: response?.data?.data?.delete_url,
        };
    }
};
exports.ImageUploadService = ImageUploadService;
exports.ImageUploadService = ImageUploadService = __decorate([
    (0, common_1.Injectable)()
], ImageUploadService);
//# sourceMappingURL=image-upload.service.js.map