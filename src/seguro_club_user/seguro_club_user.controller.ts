import { Controller, Get } from '@nestjs/common';
import { SeguroClubUserService } from './seguro_club_user.service';
import { SeguroClubUser } from './seguro_club_user.entity';

@Controller('seguro_club_user')
export class SeguroClubUserController {
  constructor(private readonly seguroClubUserService: SeguroClubUserService) {}

  @Get()
  findAll(): Promise<SeguroClubUser[]> {
    return this.seguroClubUserService.findAll();
  }
}
