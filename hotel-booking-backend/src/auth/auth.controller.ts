import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LoginUserDto } from 'src/dtos/user.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token, user } = await this.authService.login(body);

      // Set token in a cookie
      // res.cookie('token', token, {
      //   httpOnly: true, // Only accessible on the server
      //   secure: true, // Use secure cookies in production
      //   sameSite: 'none', // Protect against CSRF,
      //   maxAge: 86400000,
      // });

            res.cookie('auth_token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'none', 
                maxAge: 86400000,
            });

      // Return the cookie (optional)
      return {
        message: 'User Logged In successfully',
        userId: user._id,
      };
    } catch (error) {
      throw new HttpException(error.message || 'Login failed', error.status);
    }
  }

  @Post('/logout')
  // @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.cookie('auth_token', '', {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.send({message:"Logout Successfull"});
  }
}
