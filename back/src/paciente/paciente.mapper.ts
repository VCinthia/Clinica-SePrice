import { plainToClass } from 'class-transformer';
import { PacienteDTO } from './dto/paciente.dto';
import { Paciente } from './entities/paciente.entity';



export class PacienteMapper {

  static toEntity(pacienteDto: PacienteDTO): Paciente {
    return plainToClass(Paciente, pacienteDto);
  }


//   static toDto(persona: Persona): PersonaDTO{
//     return plainToClass(PersonaDTO, persona);
//   }
}