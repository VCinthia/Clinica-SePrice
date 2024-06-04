import { plainToClass } from 'class-transformer';
import { PersonaDTO } from './dto/persona.dto';
import { Persona } from './entities/persona.entity';
import { PacienteMapper } from 'src/paciente/paciente.mapper';
import { ProfesionalMapper } from 'src/profesional/profesional.mapper';


export class PersonaMapper {
  static toEntity(personaDto: PersonaDTO): Persona {
    const persona = plainToClass(Persona, personaDto);
    if(personaDto?.pacienteDto){
        persona.paciente = PacienteMapper.toEntity(personaDto.pacienteDto);
    }
    if(personaDto?.profesionalDto){
        persona.profesional = ProfesionalMapper.toEntity(personaDto.profesionalDto);
    }
    return persona;
  }


//   static toDto(persona: Persona): PersonaDTO{
//     return plainToClass(PersonaDTO, persona);
//   }
}