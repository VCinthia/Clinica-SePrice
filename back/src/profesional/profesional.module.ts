import { Module } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { ProfesionalController } from './profesional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { Persona } from 'src/persona/entities/persona.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Profesional,
      Persona
    ])

  ],
  providers: [ProfesionalService],
  controllers: [ProfesionalController],
  exports:[ProfesionalService]
})
export class ProfesionalModule {}
