import { Controller, Post, Body } from '@nestjs/common';
import { AuthUsuarioService } from './auth_usuario.service';
import { CreateAuthUsuarioDto } from './create-auth-usuario.dto';
import { AuthUsuario } from './auth_usuario.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Controller('auth_usuario')
export class AuthUsuarioController {
  constructor(private readonly authUsuarioService: AuthUsuarioService) {}

  @Post()
  async create(
    @Body() createAuthUsuarioDto: CreateAuthUsuarioDto,
  ): Promise<AuthUsuario> {
    return this.authUsuarioService.create(createAuthUsuarioDto);
  }

  @Post('authenticate')
  async authenticate(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authUsuarioService.authenticate(authCredentialsDto);
  }
}
