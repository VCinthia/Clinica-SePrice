import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, HistoriaClinica])],
  controllers: [PacienteController],
  providers: [PacienteService],
  exports : [PacienteService],
})
export class PacienteModule {}
