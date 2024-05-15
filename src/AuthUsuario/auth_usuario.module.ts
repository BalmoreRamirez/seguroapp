import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsuarioService } from './auth_usuario.service';
import { AuthUsuarioController } from './auth_usuario.controller';
import { AuthUsuario } from './auth_usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUsuario])],
  providers: [AuthUsuarioService],
  controllers: [AuthUsuarioController],
})
export class AuthUsuarioModule {}
