import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly usersService: UsersService,
  ) {}

  createToken(user: UsersEntity) {
    return this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: 'login',
        audience: 'users',
      },
    );
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async login(data: AuthLoginDTO) {
    const user = await this.usersRepository.findOneBy({
      email: data.email,
      password: data.password,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const token = await this.createToken(user);
    return { token };
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.usersService.createUser(data);

    const token = await this.createToken(user);
    return { token };
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email!');
    }

    return user;
  }

  async reset({ token, password }: AuthResetPasswordDTO) {
    const id = 0;
    const user = await this.usersRepository.update(Number(id), {
      password,
    });

    return;
  }
}
