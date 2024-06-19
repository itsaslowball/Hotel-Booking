import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
      const token = req.cookies?.auth_token; 
      console.log("TOKEN: ", token)
          if (!token) {
            throw new UnauthorizedException({ message: 'Unauthorized User' });
      }
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (error) {
        throw new UnauthorizedException({ message: 'Unauthorized User' });
      }
  }
}
