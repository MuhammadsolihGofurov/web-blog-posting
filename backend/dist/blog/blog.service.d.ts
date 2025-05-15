import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { ImageUploadService } from 'src/image-upload/image-upload.service';
export declare class BlogService {
    private blogModel;
    private imageUploadService;
    constructor(blogModel: Model<BlogDocument>, imageUploadService: ImageUploadService);
    createBlog(userId: Types.ObjectId, title: string, content: string): Promise<Blog>;
    getBlogsByUser(userId: Types.ObjectId): Promise<Blog[]>;
    updateBlog(userId: Types.ObjectId, blogId: string, title?: string, content?: string, is_active?: boolean): Promise<Blog>;
    deleteBlog(userId: Types.ObjectId, blogId: string): Promise<void>;
    getAllBlogs(page: number, limit: number): Promise<{
        total: number;
        page: number;
        limit: number;
        blogs: (import("mongoose").Document<unknown, {}, BlogDocument, {}> & Blog & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    createBlogWithImages(files: Express.Multer.File[], body: any): Promise<import("mongoose").Document<unknown, {}, BlogDocument, {}> & Blog & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
