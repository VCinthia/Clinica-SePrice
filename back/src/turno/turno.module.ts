import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entities/turno.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { PacienteService } from 'src/paciente/paciente.service';
import { Persona } from 'src/persona/entities/persona.entity';
import { ProfesionalService } from 'src/profesional/profesional.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Turno,
      Paciente,
      Profesional,
      Persona
    ])
  ],
  providers: [
    TurnoService,
    PacienteService,
    ProfesionalService
  
  ],
  controllers: [TurnoController],
  exports:[TurnoService]
})
export class TurnoModule {}
