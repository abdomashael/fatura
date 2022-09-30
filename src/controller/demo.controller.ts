import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { routes } from '../helper/constants';
import { JwtAuthGuard } from './auth/Guard/JwtAuthGuard';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../helper/enums';
import { CommonResponse } from '../helper/CommonResponse';
import { StatusCodes } from 'http-status-codes';

@Controller(routes.demo.base)
export class DemoController {
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @Get(routes.demo.both)
  both(): CommonResponse<string> {
    return { data: 'both', statusCode: StatusCodes.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @Get(routes.demo.user)
  userOnly(): CommonResponse<string> {
    return { data: 'user', statusCode: StatusCodes.OK };
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get(routes.demo.admin)
  adminOnly(): CommonResponse<string> {
    return { data: 'admin', statusCode: StatusCodes.OK };
  }
}
