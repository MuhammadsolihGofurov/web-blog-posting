import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from './blog.schema';
import { JwtModule } from '@nestjs/jwt'; 
import { ImageUploadService } from 'src/image-upload/image-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    JwtModule,

  ],
  providers: [BlogService , ImageUploadService],
  controllers: [BlogController],
})
export class BlogModule {}
