import { Role } from '../../helper/enums';
import { IsArray, IsString, Length } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class RegisterUserRequestDto {
  @AutoMap()
  @IsString()
  @Length(5, 20)
  userName: string;

  @IsString()
  @Length(5, 20)
  password: string;

  @AutoMap()
  @IsString()
  @Length(2, 20)
  firstName: string;

  @AutoMap()
  @IsString()
  @Length(2, 20)
  lastName: string;

  @AutoMap(() => String)
  @IsArray()
  roles: Role[];
}
