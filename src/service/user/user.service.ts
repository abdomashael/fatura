import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/User.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(userName: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ userName });
  }

  async save(newUser: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(newUser);
  }
}
