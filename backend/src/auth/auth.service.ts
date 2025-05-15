import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: MailService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Login yoki parol noto‘g‘ri');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Email tasdiqlanmagan');
    }

    const { password: hashedPassword, ...result } = user.toObject();
    return result;
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    const user = await this.usersService.findByVerifyToken(token);
    if (!user) {
      throw new NotFoundException('Noto‘g‘ri yoki eskirgan token');
    }

    if (user.isVerified == 'active') {
      return { message: 'Email allaqachon tasdiqlangan' };
    }

    user.isVerified = 'active';
    user.verifyToken = null;
    await user.save();

    return { message: 'Email muvaffaqiyatli tasdiqlandi' };
  }

  async login(user: any) {
    const existingUser = await this.usersService.findUserByEmail(user.email);
    const payload = { username: user.username, sub: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      _id: user._id,
      role: user.role,
      email: user.email,
    };
  }

  async register(username: string, password: string, email: string) {
    const token = randomBytes(32).toString('hex');

    const user = await this.usersService.createUserWithEmail(
      username,
      password,
      email,
      token,
    );

    await this.emailService.sendVerificationEmail(email, token);
    return { message: 'Emailingizga tasdiqlash havolasi yuborildi' };
  }

  async createAdmin(username: string, password: string) {
    return this.usersService.createUser(username, password, 'admin');
  }

  async deleteByEmail(email: string) {
    await this.usersService.deleteByEmail(email);
  }
}
