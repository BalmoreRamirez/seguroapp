import { Controller } from '@nestjs/common';
import { AuthUsuarioService } from './auth_usuario.service';
import { Body, Post } from '@nestjs/common';
import { CreateAuthUsuarioDto } from './create-auth-usuario.dto';
import { AuthUsuario } from './auth_usuario.entity';

@Controller('auth_usuario')
export class AuthUsuarioController {
  constructor(private readonly authUsuarioService: AuthUsuarioService) {}

  @Post()
  async create(
    @Body() createAuthUsuarioDto: CreateAuthUsuarioDto,
  ): Promise<AuthUsuario> {
    return this.authUsuarioService.create(createAuthUsuarioDto);
  }
}
