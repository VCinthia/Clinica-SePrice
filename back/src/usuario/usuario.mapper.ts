import { plainToClass } from 'class-transformer';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';
import { PersonaMapper } from 'src/persona/persona.mapper';

export class UsuarioMapper {
  static toEntity(usuarioDto: UsuarioDTO): Usuario {
    const usuario = plainToClass(Usuario, usuarioDto);
    usuario.persona = PersonaMapper.toEntity(usuarioDto.persona);
    return usuario;
  }

  static toDto(usuario: Usuario): UsuarioDTO{
    const usuarioDTO = plainToClass(UsuarioDTO, usuario);
    usuarioDTO.persona = PersonaMapper.toDto(usuario.persona)
    return usuarioDTO;
  }
}
