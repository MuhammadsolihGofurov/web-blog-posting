import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gofurovmuhammadsolih004:FnGPvErCF3GQgXlo@backend.a9tdunb.mongodb.net/?retryWrites=true&w=majority&appName=backend'), UsersModule, AuthModule, BlogModule,],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}


// gofurovmuhammadsolih004
// FnGPvErCF3GQgXlo