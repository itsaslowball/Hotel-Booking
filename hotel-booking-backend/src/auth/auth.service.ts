import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/dtos/user.dto';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginUserDto) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }

    // Generate JWT token
    const payload = { username: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    // Return token and user object
    return { token, user};
  }
}
