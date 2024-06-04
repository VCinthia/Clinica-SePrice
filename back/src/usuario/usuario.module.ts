import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { Profesional } from 'src/profesional/entities/profesional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Persona, Profesional])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports : [UsuarioService]
})
export class UsuarioModule {}
