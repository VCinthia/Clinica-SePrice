import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';
import { PacienteDTO } from './dto/paciente.dto';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  createPaciente(@Body() pacienteDTO: PacienteDTO): Promise<Paciente> {
    return this.pacienteService.createPaciente(pacienteDTO);
  }

  @Get('/:dni')
  getPacienteByDni(@Param('dni') dni: number): Promise<Paciente> {
    return this.pacienteService.getPacienteByDNI(dni);
  }
}
