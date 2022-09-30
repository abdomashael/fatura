import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { UserService } from './service/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './helper/constants';
import { LocalStrategy } from './controller/auth/Strategy/LocalStrategy';
import { JwtStrategy } from './controller/auth/Strategy/JwtStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './controller/auth/Guard/RolesGuard';
import { UserEntity } from './entity/User.Entity';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import StringEncryptionService from './service/string-encryption.service';
import { DemoController } from './controller/demo.controller';

@Module({
  imports: [
    PassportModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'fatura',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController, DemoController],
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
})
export class AppModule {}
