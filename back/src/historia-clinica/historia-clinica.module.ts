import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { HistoriaClinica } from './entities/historia.entity';
import { Paciente } from 'src/paciente';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica, Paciente /*, Usuario*/])],
  providers: [HistoriaClinicaService],
  controllers: [HistoriaClinicaController],
  exports : [HistoriaClinicaService],
})
export class HistoriaClinicaModule {}
