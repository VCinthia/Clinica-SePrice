import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { PersonaDTO } from './dto/persona.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioDTO } from '../usuario/dto/usuario.dto';

@Injectable()
export class PersonaService {
  personaNotFound = 'No existe la persona.';

  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) { }

  public async createPersona(personaDTO: PersonaDTO, usuarioDTO?: UsuarioDTO) {
    try {
      const condition: FindOneOptions<Persona> = { where: { dni: personaDTO.dni } };
      const personaExistente: Persona = await this.personaRepo.findOne(condition);

      if (!personaExistente) {
        const newPersona = this.personaRepo.create({
            ...personaDTO,
            usuario: null,  // Inicialmente sin el username
          });

        // if (usuarioDTO) {
        //   const newUsuario = this.usuarioRepo.create(usuarioDTO);
        //   const savedUsuario = await this.usuarioRepo.save(newUsuario);
        //   newPersona.username = savedUsuario;
        // }

        return this.personaRepo.save(newPersona);
      } else {
        throw new Error('La persona ya existe.');
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Falló la creación - ' + error,
      }, HttpStatus.NOT_FOUND);
    }
  }

  public async getPersonaByDNI(dni: number) {
    try {
      const condition: FindOneOptions<Persona> = { where: { dni: dni } };
      const persona: Persona = await this.personaRepo.findOne(condition);
      if (persona) {
        return persona;
      } else {
        throw new Error('No existe el DNI ingresado.');
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la búsqueda: ' + error,
      }, HttpStatus.NOT_FOUND);
    }
  }
}
