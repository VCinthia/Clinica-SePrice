import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PersonaDTO } from 'src/persona/dto/persona.dto';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { Persona } from 'src/persona/entities/persona.entity';
import { PacienteResponse } from 'src/Utils/types';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  public async createPaciente(@Body() personaDTO: PersonaDTO) : Promise<ResponseDTO<PacienteResponse>> {
    return this.pacienteService.createPaciente(personaDTO);
  }

  @Get('/:dni')
  public async getPacienteByDni(@Param('dni') dni: number){
    return this.pacienteService.getPacienteByDni(dni);
  }
}
