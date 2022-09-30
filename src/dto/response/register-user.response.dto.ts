import { Role } from '../../helper/enums';
import { AutoMap } from '@automapper/classes';

export class RegisterUserResponseDto {
  @AutoMap()
  userName: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;
  roles: Role[];
}
