import { Controller, Post, Body, Get, Param, HttpRedirectResponse, HttpStatus, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './dto/usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  public async createUsuario(@Body() usuarioDTO: UsuarioDTO) : Promise<ResponseDTO<Usuario>> {
    return this.usuarioService.createUsuario(usuarioDTO);
  }

  @Get('username')
  public async getUsuarioByUsername(@Query('username') username: string){
    return this.usuarioService.getUsuarioByUsername(username);
  }


  @Get('userpass')
  public async getUsuarioByUsernameAndPass(
    @Query('username') username: string,
    @Query('pass') pass: string,
  ): Promise<UsuarioDTO> {
    return this.usuarioService.getUsuarioByUsernameAndPass(username, pass);
  }





}
