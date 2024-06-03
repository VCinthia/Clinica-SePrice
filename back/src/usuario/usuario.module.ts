import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Persona])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports : [UsuarioService]
})
export class UsuarioModule {}
