import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { SeguroClubUser } from '../seguro_club_user/seguro_club_user.entity';
import { Club } from '../club/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SeguroClubUser, Club])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule], // export TypeOrmModule
})
export class UserModule {}
