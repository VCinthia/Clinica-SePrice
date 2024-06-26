import { plainToClass } from 'class-transformer';
import { PersonaDTO } from './dto/persona.dto';
import { Persona } from './entities/persona.entity';
import { PacienteMapper } from 'src/paciente/paciente.mapper';
import { ProfesionalMapper } from 'src/profesional/profesional.mapper';


export class PersonaMapper {
  static toEntity(personaDto: PersonaDTO): Persona {
    const persona = plainToClass(Persona, personaDto);
    if(personaDto?.paciente){
        persona.paciente = PacienteMapper.toEntity(personaDto.paciente);
    }
    if(personaDto?.profesional){
        persona.profesional = ProfesionalMapper.toEntity(personaDto.profesional);
    }
    return persona;
  }


  static toDto(persona: Persona): PersonaDTO{
    const personaDTO = plainToClass(PersonaDTO, persona);
    if(persona?.paciente){
        personaDTO.paciente = PacienteMapper.toDto(persona.paciente);
    }
    if(persona?.profesional){
        personaDTO.profesional = ProfesionalMapper.toDto(persona.profesional);
    }
    return personaDTO;

  }
}