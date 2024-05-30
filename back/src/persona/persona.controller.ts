import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './entities/persona.entity';
import { PersonaDTO } from './dto/persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) { }

  @Post()
  createPersona(@Body() personaDTO: PersonaDTO): Promise<Persona> {
    return this.personaService.createPersona(personaDTO);
  }

  //@Public()
  @Get('/:dni')
  getPersonaByDni(@Param('dni') dni: number): Promise<Persona> {
    return this.personaService.getPersonaByDNI(dni);
  }
}
