import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';
import { routes } from '../../helper/constants';
import { LocalAuthGuard } from './Guard/LocalAuthGuard';
import { JwtAuthGuard } from './Guard/JwtAuthGuard';
import { Roles } from '../../decorator/roles.decorator';
import { Role } from '../../helper/enums';
import { RegisterUserRequestDto } from '../../dto/request/register-user.request.dto';
import { RegisterUserResponseDto } from '../../dto/response/register-user.response.dto';
import { CommonResponse } from '../../helper/CommonResponse';
import { StatusCodes } from 'http-status-codes';

@Controller(routes.auth.base)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(routes.auth.login)
  async login(@Request() req) {
    return {
      statusCode: StatusCodes.OK,
      data: await this.authService.login(req.user),
    };
  }

  @Post(routes.auth.register)
  async register(
    @Body() registerUserRequestDto: RegisterUserRequestDto,
  ): Promise<CommonResponse<RegisterUserResponseDto>> {
    return {
      statusCode: StatusCodes.CREATED,
      data: await this.authService.register(
        registerUserRequestDto as RegisterUserRequestDto,
      ),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @Post(routes.auth.password)
  changePassword(@Request() req) {
    return req.user;
  }
}
