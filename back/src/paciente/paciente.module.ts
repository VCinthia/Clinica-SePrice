import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia-clinica.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { TurnoService } from 'src/turno/turno.service';
import { Turno } from 'src/turno/entities/turno.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { ProfesionalService } from 'src/profesional/profesional.service';
import { HistoriaClinicaService } from 'src/historia-clinica/historia-clinica.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paciente, 
      HistoriaClinica, 
      Persona,
      Turno,
      Profesional,
      Usuario
    ])
  ],
  providers: [
    PacienteService,
    ProfesionalService,
    TurnoService,
    HistoriaClinicaService,
  ],
  controllers: [PacienteController],
  exports : [PacienteService],
})
export class PacienteModule {}
