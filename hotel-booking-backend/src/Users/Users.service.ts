import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/dtos/user.dto';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(body: RegisterUserDto) {
    try {
      // Check if user with the same email already exists
      const existingUser = await this.userModel.findOne({ email: body.email });
      if (existingUser) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.CONFLICT,
        );
      }

      // Hash the password
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);

      // Create new user
      const newUser = await this.userModel.create({
        ...body,
        password: hashedPassword,
      });

      // Generate JWT token
      const payload = { username: newUser.email, sub: newUser._id };
      const token = this.jwtService.sign(payload);

      // Return token and user object
      return { token, user: newUser };
    } catch (error) {
      // Catch any errors during registration process
      if (error.status === 409) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Registration failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserById(userId: string) { 
    return this.userModel.findById(userId).select('-password');
  }
}
