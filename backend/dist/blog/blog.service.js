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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("./blog.schema");
const image_upload_service_1 = require("../image-upload/image-upload.service");
let BlogService = class BlogService {
    blogModel;
    imageUploadService;
    constructor(blogModel, imageUploadService) {
        this.blogModel = blogModel;
        this.imageUploadService = imageUploadService;
    }
    async createBlog(userId, title, content) {
        const newBlog = new this.blogModel({
            title,
            content,
            author: userId,
            is_active: true,
        });
        return newBlog.save();
    }
    async getBlogsByUser(userId) {
        return this.blogModel.find({ author: userId }).exec();
    }
    async updateBlog(userId, blogId, title, content, is_active) {
        const blog = await this.blogModel.findById(blogId);
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (!blog.author.equals(userId))
            throw new common_1.ForbiddenException('Access denied');
        if (title !== undefined)
            blog.title = title;
        if (content !== undefined)
            blog.content = content;
        if (is_active !== undefined)
            blog.is_active = is_active;
        return blog.save();
    }
    async deleteBlog(userId, blogId) {
        const blog = await this.blogModel.findById(blogId);
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (!blog.author.equals(userId))
            throw new common_1.ForbiddenException('Access denied');
        await this.blogModel.deleteOne({ _id: blogId });
    }
    async getAllBlogs(page, limit) {
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            this.blogModel
                .find({ is_active: true })
                .skip(skip)
                .limit(limit)
                .populate('author', 'username email')
                .exec(),
            this.blogModel.countDocuments({ is_active: true }),
        ]);
        return {
            total,
            page,
            limit,
            blogs,
        };
    }
    async createBlogWithImages(files, body) {
        let posterImage = '';
        const imageLinks = [];
        for (let i = 0; i < files.length; i++) {
            const uploaded = await this.imageUploadService.uploadImage(files[i].path);
            if (i === 0) {
                posterImage = uploaded.image.url;
            }
            imageLinks.push(uploaded.image.url);
        }
        const createdBlog = new this.blogModel({
            title: body.title,
            content: body.content,
            poster_image: posterImage,
            images: imageLinks,
            author: body.author,
            is_active: true,
        });
        return createdBlog.save();
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        image_upload_service_1.ImageUploadService])
], BlogService);
//# sourceMappingURL=blog.service.js.map