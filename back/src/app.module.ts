import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from 'bdd/typeorm.config';
import { PersonaModule } from './persona/persona.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PacienteModule } from './paciente/paciente.module';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';
import { InsumoModule } from './insumo/insumo.module';
import { TurnoModule } from './turno/turno.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PersonaModule,
    UsuarioModule,
    PacienteModule,
    HistoriaClinicaModule,
    InsumoModule,
    TurnoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
