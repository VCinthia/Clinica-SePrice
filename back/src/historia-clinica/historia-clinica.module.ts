import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, Paciente /*, Usuario*/])],
  providers: [HistoriaClinicaService],
  controllers: [HistoriaClinicaController],
  exports : [HistoriaClinicaService],
})
export class HistoriaClinicaModule {}
