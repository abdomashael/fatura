import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../helper/enums';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn({ generated: true })
  id: ObjectID;

  @AutoMap()
  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap(() => String)
  @Column()
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
