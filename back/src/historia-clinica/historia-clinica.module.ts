import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, Paciente, Persona, Usuario])],
  providers: [HistoriaClinicaService],
  controllers: [HistoriaClinicaController],
  exports : [HistoriaClinicaService],
})
export class HistoriaClinicaModule {}
