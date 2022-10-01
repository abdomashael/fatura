import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './Strategy/LocalStrategy';
import { JwtStrategy } from './Strategy/JwtStrategy';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/user/user.service';
import StringEncryptionService from '../../service/string-encryption.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Guard/RolesGuard';
import { PassportModule } from '@nestjs/passport';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../helper/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/User.Entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1h' },
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
      controllers: [AuthController],
      providers: [
        LocalStrategy,
        JwtStrategy,
        AuthService,
        UserService,
        StringEncryptionService,
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
