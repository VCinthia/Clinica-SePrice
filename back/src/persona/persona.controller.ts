import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaDTO } from './dto/persona.dto';
import { UsuarioDTO } from '../usuario/dto/usuario.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}


  @Get('dni/:dni')
  public async getPersonaByDNI(@Param('dni') dni: number) {
    return this.personaService.getPersonaByDNI(dni);
  }
}
