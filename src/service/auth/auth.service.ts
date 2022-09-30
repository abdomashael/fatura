import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserRequestDto } from '../../dto/request/register-user.request.dto';
import { RegisterUserResponseDto } from '../../dto/response/register-user.response.dto';
import { UserEntity } from '../../entity/User.Entity';
import StringEncryptionService from '../string-encryption.service';
import {
  createMap,
  createMapper,
  forMember,
  ignore,
  Mapper,
} from '@automapper/core';
import { classes } from '@automapper/classes';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AuthService {
  private readonly mapper: Mapper;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private stringEncryptionService: StringEncryptionService,
  ) {
    this.mapper = createMapper({
      strategyInitializer: classes(),
    });
    createMap(this.mapper, RegisterUserRequestDto, UserEntity);
    createMap(this.mapper, UserEntity, RegisterUserResponseDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isValid =
      user && (await this.stringEncryptionService.compare(pass, user.password));

    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    registerUserRequestDto: RegisterUserRequestDto,
  ): Promise<RegisterUserResponseDto> {
    const user = await this.userService.findOne(
      registerUserRequestDto.userName,
    );

    if (user)
      throw new HttpException('Username already exists.', StatusCodes.CONFLICT);

    const userEntity = await this.mapRegisterUserRequestDtoToUserEntity(
      registerUserRequestDto,
    );

    const newUserEntity = await this.userService.save(userEntity);
    return this.mapper.map(newUserEntity, UserEntity, RegisterUserResponseDto);
  }

  private async mapRegisterUserRequestDtoToUserEntity(
    registerUserRequestDto: RegisterUserRequestDto,
  ): Promise<UserEntity> {
    const userEntity: UserEntity = this.mapper.map(
      registerUserRequestDto,
      RegisterUserRequestDto,
      UserEntity,
    );
    const { password } = registerUserRequestDto;

    userEntity.password = await this.stringEncryptionService.hash(password);

    return userEntity;
  }
}
