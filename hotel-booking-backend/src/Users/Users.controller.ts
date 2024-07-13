import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/user.dto';
import { UserService } from './Users.service';
import { Request, Response } from 'express';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/me')
  async getMyDetails(@Req() req: Request) {
    try {
      const userId = req.userId;
      return this.userService.getUserById(userId);
    }
    catch (error) {
      throw new HttpException(
        error.message || 'User not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('/register')
  async registerUser(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
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
