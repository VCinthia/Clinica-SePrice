import { plainToClass } from "class-transformer";
import { TurnoDTO } from "./dto/turno.dto";
import { Turno } from "./entities/turno.entity";
import { PacienteMapper } from "src/paciente/paciente.mapper";
import { ProfesionalMapper } from "src/profesional/profesional.mapper";

export class TurnoMapper {
    static toEntity(turnoDto: TurnoDTO): Turno {
      const turno = plainToClass(Turno, turnoDto);
      turno.paciente = PacienteMapper.toEntity(turnoDto.paciente);
      turno.profesional = ProfesionalMapper.toEntity(turnoDto.profesional);
      return turno;
    }
  
    // static toDto(usuario: Usuario): UsuarioDTO{
    //   //todo: revisar que agrege persona
    //   return plainToClass(UsuarioDTO, usuario);
    // }
  }