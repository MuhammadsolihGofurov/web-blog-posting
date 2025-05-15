import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async createUser(
    username: string,
    password: string,
    role: 'user' | 'admin' = 'user',
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      username,
      password: hashedPassword,
      role,
    });
    return createdUser.save();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createUserWithEmail(
    username: string,
    password: string,
    email: string,
    token: string,
  ) {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser && existingUser.isVerified === 'in_registration') {
      await this.userModel.deleteOne({ email });
    } else if (existingUser) {
      throw new Error(
        'User already exists and is verified or in a different status',
      );
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

  async confirmEmail(token: string) {
    const user = await this.userModel.findOne({
      verifyToken: token,
    });
    if (!user) throw new Error('Token noto‘g‘ri yoki allaqachon ishlatilgan');

    user.isVerified = 'active';
    user.verifyToken = null;
    await user.save();
    return { message: 'Email muvaffaqiyatli tasdiqlandi' };
  }

  async deleteByEmail(email: string) {
    await this.userModel.deleteOne({ email });
  }

  async findByVerifyToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ verifyToken: token });
  }
}
