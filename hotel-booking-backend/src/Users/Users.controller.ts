import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/user.dto';
import { UserService } from './Users.service';
import { Response } from 'express';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      console.log("BODY", body);
      const { token, user } = await this.userService.registerUser(body);

      res.cookie('auth_token', token, {
        httpOnly: true, // Only accessible on the server
        secure: true, // Use secure cookies in production
        sameSite: 'none', // Protect against CSRF,
        maxAge: 86400000,
      });

      return {
        message: 'User registered successfully',
        userId: user._id,
      };
    } catch (error) {
      // Catch registration errors
      throw new HttpException(
        error.message || 'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/register')
  async test() {
    return { message: 'TEST' };
  }
}
