import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';
import { PacienteDTO } from './dto/paciente.dto';

@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  public async createPaciente(@Body() pacienteDTO: PacienteDTO) {
    return this.pacienteService.createPaciente(pacienteDTO);
  }

  @Get('/:dni')
  public async getPacienteByDni(@Param('dni') dni: number){
    return this.pacienteService.getPacienteByDni(dni);
  }
}
