import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Insumo } from './entities/insumo.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PersonaService } from 'src/persona/persona.service';
import { Persona } from 'src/persona/entities/persona.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Insumo, 
      Usuario,
      Persona,
      Profesional
    ])
  ],
  providers: [
    InsumoService, 
    UsuarioService
  ],
  controllers: [InsumoController],
  exports: [InsumoService]
})
export class InsumoModule {}
