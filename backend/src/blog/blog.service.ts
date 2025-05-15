import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { ImageUploadService } from 'src/image-upload/image-upload.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    private imageUploadService: ImageUploadService,
  ) {}

  async createBlog(
    userId: Types.ObjectId,
    title: string,
    content: string,
  ): Promise<Blog> {
    const newBlog = new this.blogModel({
      title,
      content,
      author: userId,
      is_active: true,
    });
    return newBlog.save();
  }

  async getBlogsByUser(userId: Types.ObjectId): Promise<Blog[]> {
    return this.blogModel.find({ author: userId }).exec();
  }

  async updateBlog(
    userId: Types.ObjectId,
    blogId: string,
    title?: string,
    content?: string,
    is_active?: boolean,
  ): Promise<Blog> {
    const blog = await this.blogModel.findById(blogId);
    if (!blog) throw new NotFoundException('Blog not found');
    if (!blog.author.equals(userId))
      throw new ForbiddenException('Access denied');

    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (is_active !== undefined) blog.is_active = is_active;

    return blog.save();
  }

  async deleteBlog(userId: Types.ObjectId, blogId: string): Promise<void> {
    const blog = await this.blogModel.findById(blogId);
    if (!blog) throw new NotFoundException('Blog not found');
    if (!blog.author.equals(userId))
      throw new ForbiddenException('Access denied');

    await this.blogModel.deleteOne({ _id: blogId });
  }

  async getAllBlogs(page: number, limit: number) {
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

  async createBlogWithImages(
    files: Express.Multer.File[],
    body: any,
  ) {
    let posterImage = '';
    const imageLinks: string[] = [];

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
}
