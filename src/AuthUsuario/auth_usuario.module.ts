// auth_usuario.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUsuarioController } from './auth_usuario.controller';
import { AuthUsuarioService } from './auth_usuario.service';
import { AuthUsuario } from './auth_usuario.entity';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUsuario]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthUsuarioController],
  providers: [AuthUsuarioService, JwtStrategy],
  exports: [AuthUsuarioService],
})
export class AuthUsuarioModule {}
