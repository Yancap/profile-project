import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersEntity } from '../users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    JwtModule.register({
      secret: "cH@v3-s&Cr3T4-C0m-E2-D1g1T0s-Ç",
    }),
    TypeOrmModule.forFeature([UsersEntity]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }