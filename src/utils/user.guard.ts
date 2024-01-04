/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request) as string;
    if (!token) {
      throw new HttpException(
        {
          status: 401,
          data: null,
          error: '授权已失效',
        },
        HttpStatus.OK,
        {
          cause: '',
        },
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      request['user'] = null;
      throw new HttpException(
        {
          status: 401,
          data: null,
          error: '授权已失效',
        },
        HttpStatus.OK,
        {
          cause: '',
        },
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const token = request.headers['x-token'];

    return token;
  }
}
