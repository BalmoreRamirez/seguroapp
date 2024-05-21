// src/club/club.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Club]),
    forwardRef(() => UserModule), // Use forwardRef() here
  ],
  providers: [ClubService],
  controllers: [ClubController],
  exports: [ClubService],
})
export class ClubModule {}
