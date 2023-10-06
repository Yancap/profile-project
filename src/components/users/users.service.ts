import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(data: UserCreateDTO) {
    const isEmailExist = await this.usersRepository.find({
      where: { email: data.email },
    });

    if (isEmailExist.length > 0) {
      throw new UnauthorizedException(`Email already exists`);
    }
    const user = await this.usersRepository.save(data);
    return user;
  }
  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }
  async getByUserId(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }
}
