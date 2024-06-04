import { plainToClass } from "class-transformer";
import { InsumoDTO } from "./dto/insumo.dto";
import { Insumo } from "./entities/insumo.entity";
import { UsuarioMapper } from "src/usuario/usuario.mapper";

export class InsumoMapper {
    static toEntity(insumoDTO: InsumoDTO): Insumo {
      const insumo = plainToClass(Insumo, insumoDTO);
      insumo.usuario = UsuarioMapper.toEntity(insumoDTO.usuarioUltimaModificacion);
      return insumo;
    }
  
    // static toDto(usuario: Usuario): UsuarioDTO{
    //   //todo: revisar que agrege persona
    //   return plainToClass(UsuarioDTO, usuario);
    // }
  }