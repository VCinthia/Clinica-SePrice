import { Controller, Post, Body, Get, Param, HttpRedirectResponse, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  public async createUsuario(@Body() usuarioDTO: UsuarioDTO) {
    return this.usuarioService.createUsuario(usuarioDTO);
  }

  @Get(':username')
  public async getUsuarioByUsername(@Param('username') username: string) {
    return this.usuarioService.getUsuarioByUsername(username);
  }
}
