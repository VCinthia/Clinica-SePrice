import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';
import { Persona } from '../persona/entities/persona.entity';
import { UsuarioMapper } from './usuario.mapper';
import { Profesional } from 'src/profesional/entities/profesional.entity';
import { log } from 'console';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { response } from 'express';

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



  public async createUsuario(usuarioDTO: UsuarioDTO): Promise<ResponseDTO<Usuario>> {
    try {
      // Validación: un paciente no puede tener un usuario
      if (usuarioDTO.persona.paciente) {
        throw new HttpException('No es posible registrar al usuario con un paciente', HttpStatus.BAD_REQUEST);
      }
      
      //TypeORM: asegurarse que los parametros del "where" no sean  null, si esto pasa TypeORM busca por defecto con el valor "1"
      if (usuarioDTO.persona.dni && usuarioDTO.username ) {
          // Validación: reviso que no exista la persona en la DDBB 
          const personaExiste = await this.personaRepo.findOne({ where: { dni: usuarioDTO.persona.dni } });
          if (personaExiste) {
            throw new HttpException('La persona ya está registrada.', HttpStatus.BAD_REQUEST);
          }

          // Validación: reviso que no exista el nombre de usuario en la DDBB
          const usuarioExiste: Usuario = await this.usuarioRepo.findOne({ where: { username: usuarioDTO.username } });
          if (usuarioExiste) {
            throw new HttpException('El nombre de usuario no está disponible.', HttpStatus.BAD_REQUEST);
          }
      } else {
        throw new HttpException('El DNI y el username son obligatorios para registrar un usuario.', HttpStatus.BAD_REQUEST);
      }

      // PersonaDTO to Entity
      const newUsuario: Usuario = UsuarioMapper.toEntity(usuarioDTO);
      console.log("nuevo usuario:", newUsuario);

      // PERSISTENCIA
      const savedUsuario = await this.usuarioRepo.save(newUsuario);

      // Retorno mensaje de éxito con datos del usuario guardado
      const response: ResponseDTO<Usuario> = new ResponseDTO(true, "Usuario creado con éxito", savedUsuario);
      return response;
      
    } catch (error) {
      console.error("error: ", error);
      throw new HttpException(error.message || "Error al registrar usuario", HttpStatus.BAD_REQUEST);
    }
  }



  public async getUsuarioByUsername(username: string) {
      const condition: FindOneOptions<Usuario> = { relations :['persona'] ,where: { username: username } };
      const usuario: Usuario = await this.usuarioRepo.findOne(condition);
      console.log("usuarioDBUsername: ", usuario)
      if(!usuario){
        throw new NotFoundException("El usuario no está registrado");
      }

      return usuario;
    }

  


    public async getUsuarioByUsernameAndPass(username: string, pass:string): Promise<UsuarioDTO>{
      const usuarioDB = await this.usuarioRepo.findOne({
        where: {
          username: username,
          password: pass,
        },
      });
        console.log("usuarioPassDB: ", usuarioDB)
        if(!usuarioDB){
          throw new NotFoundException("Claves de identificación inválidas");
        }

        if (username !== usuarioDB.username) {
          throw new NotFoundException("Usuario incorrecto");
        }
        if (pass !== usuarioDB.password) {
          throw new NotFoundException("Contraseña incorrecta");
        }

        const usuarioDTO: UsuarioDTO = UsuarioMapper.toDto(usuarioDB);
        return usuarioDTO;
      }

}
