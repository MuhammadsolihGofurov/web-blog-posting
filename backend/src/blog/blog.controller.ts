import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Types } from 'mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(
  FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }),
)
  async createBlog(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
    @Body() body,
  ) {
    return this.blogService.createBlogWithImages(files, body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserBlogs(@Req() req) {
    const userId = req.user.userId;
    return this.blogService.getBlogsByUser(new Types.ObjectId(userId));
  }

  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  async updateBlog(
    @Req() req,
    @Param('id') id: string,
    @Body() body: { title?: string; content?: string; is_active?: boolean },
  ) {
    const userId = req.user.userId;
    return this.blogService.updateBlog(
      new Types.ObjectId(userId),
      id,
      body.title,
      body.content,
      body.is_active,
    );
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteBlog(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    await this.blogService.deleteBlog(new Types.ObjectId(userId), id);
    return { message: 'Blog deleted successfully' };
  }

  @Get('all')
  async getAllBlogs(@Query('page') page = '1', @Query('limit') limit = '10') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.blogService.getAllBlogs(pageNumber, limitNumber);
  }
}
