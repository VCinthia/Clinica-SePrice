import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  createUsuario(@Body() usuarioDTO: UsuarioDTO): Promise<Usuario> {
    return this.usuarioService.createUsuario(usuarioDTO);
  }

  @Get('/:dni')
  getUsuarioByDni(@Param('dni') dni: number): Promise<Usuario> {
    return this.usuarioService.getUsuarioByDNI(dni);
  }
}
