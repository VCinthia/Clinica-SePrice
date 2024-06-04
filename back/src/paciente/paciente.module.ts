import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { TurnoService } from 'src/turno/turno.service';
import { Turno } from 'src/turno/entities/turno.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { ProfesionalService } from 'src/profesional/profesional.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paciente, 
      HistoriaClinica, 
      Persona,
      Turno,
      Profesional
    ])
  ],
  providers: [
    PacienteService,
    ProfesionalService,
    TurnoService,
  ],
  controllers: [PacienteController],
  exports : [PacienteService],
})
export class PacienteModule {}
