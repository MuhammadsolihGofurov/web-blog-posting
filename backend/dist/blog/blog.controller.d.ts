import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    createBlog(files: Array<Express.Multer.File>, req: any, body: any): Promise<import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}> & import("./blog.schema").Blog & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserBlogs(req: any): Promise<import("./blog.schema").Blog[]>;
    updateBlog(req: any, id: string, body: {
        title?: string;
        content?: string;
        is_active?: boolean;
    }): Promise<import("./blog.schema").Blog>;
    deleteBlog(req: any, id: string): Promise<{
        message: string;
    }>;
    getAllBlogs(page?: string, limit?: string): Promise<{
        total: number;
        page: number;
        limit: number;
        blogs: (import("mongoose").Document<unknown, {}, import("./blog.schema").BlogDocument, {}> & import("./blog.schema").Blog & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
}
