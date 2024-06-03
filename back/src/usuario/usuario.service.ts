import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';
import { Persona } from '../persona/entities/persona.entity';
import { PersonaDTO } from '../persona/dto/persona.dto';

@Injectable()
export class UsuarioService {
  usuarioNotFound = 'No existe el usuario.';

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
  ) {}

  public async createUsuario(usuarioDTO: UsuarioDTO
    //, personaDTO: PersonaDTO
  ) {
    try {
      //TODO:verifica existencia de usuario OK
      const condition: FindOneOptions<Usuario> = { where: { username: usuarioDTO.username } };
      console.log("usuarioDTO: ",usuarioDTO);
      
      const usuarioExistente: Usuario = await this.usuarioRepo.findOne(condition);

      if (!usuarioExistente) {
        let savedPersona: Persona;
        if (usuarioDTO.persona) {
          const personaCondition: FindOneOptions<Persona> = { where: { dni: usuarioDTO.persona.dni } };
          console.log('personaCondition: ', personaCondition);
          
          const personaExistente = await this.personaRepo.findOne(personaCondition);
          console.log('personaExistente: ',personaExistente);
          
          if (!personaExistente) {
            const newPersona = this.personaRepo.create(usuarioDTO.persona);
            console.log('newPersona: ', newPersona);
            
            savedPersona = await this.personaRepo.save(newPersona);
            console.log('savedPersona: ', savedPersona);

            const newUsuario = this.usuarioRepo.create({
              ...usuarioDTO,
              persona: savedPersona,
            });
            return this.usuarioRepo.save(newUsuario);
          }     else {
            throw new Error('La persona ya existe.');
          }     
          
        }
        //console.log('savedPersona2: ', savedPersona);
        
      } else {
        throw new Error('El usuario ya existe.');
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Falló la creación - ' + error,
      }, HttpStatus.NOT_FOUND);
    }
  }

  public async getUsuarioByUsername(username: string) {
    try {
      const condition: FindOneOptions<Usuario> = { relations :['persona'] ,where: { username: username } };
      const usuario: Usuario = await this.usuarioRepo.findOne(condition);
      if (usuario) {
        return usuario;
      } else {
        throw new Error('No existe el username ingresado.');
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la búsqueda: ' + error,
      }, HttpStatus.NOT_FOUND);
    }
  }
}
