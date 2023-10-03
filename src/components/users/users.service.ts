import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/Register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>
  ){}

  async createUser(data: RegisterUserDTO){
    const isEmailExist = await this.usersRepository.find( {where: { email: data.email } } )
    
    if (isEmailExist.length > 0) {
      throw new Error(`Email already exists`)
    }
    const user = this.usersRepository.save(data);
    return user;
  }
  async getAllUsers(){
    const users = await this.usersRepository.find();
    return users
  }
  async getByUserId(id: number){
    const user = await this.usersRepository.findOne({ where: { id } });
    return user
  }
}
