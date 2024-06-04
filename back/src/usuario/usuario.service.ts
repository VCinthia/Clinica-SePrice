import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';
import { Persona } from '../persona/entities/persona.entity';
import { UsuarioMapper } from './usuario.mapper';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { log } from 'console';

@Injectable()
export class UsuarioService {
  usuarioNotFound = 'No existe el usuario.';

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
    @InjectRepository(Profesional)
    private readonly profesionalRepo: Repository<Profesional>,
  ) {}



  public  async createUsuario(usuarioDTO: UsuarioDTO): Promise<Usuario> {
    try{
      
      //reviso que no exista la persona en la DDBB 
      const personaExiste = await this.personaRepo.findOne({where:{dni:usuarioDTO.persona.dni}});
      if(personaExiste){
        throw new Error('La persona ya está registrada.');
      }

      //reviso que no exista el nombre de usuario en la DDBB
      const usuarioExiste: Usuario = await this.usuarioRepo.findOne({where:{username:usuarioDTO.username}});
      if(usuarioExiste){
        throw new Error('El nombre de usuario no está disponible.');
      }

      //PersonaDTO to Entity
      const newUsuario: Usuario = UsuarioMapper.toEntity(usuarioDTO);
      console.log("nuevo usuario *** ", newUsuario);



      //PERSISTENCIA
      return this.usuarioRepo.save(newUsuario);
    } catch (error) {
      throw new HttpException({
        error: error
      }, HttpStatus.BAD_REQUEST);
    }

  }






  public async getUsuarioByUsername(username: string) {
      const condition: FindOneOptions<Usuario> = { relations :['persona'] ,where: { username: username } };
      const usuario: Usuario = await this.usuarioRepo.findOne(condition);
      if(!usuario){
        throw new NotFoundException("El usuario no está registrado");
      }

      return usuario;
    }

  
}
