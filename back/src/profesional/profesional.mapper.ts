import { plainToClass } from 'class-transformer';
import { ProfesionalDTO } from './dto/profesional.dto';
import { Profesional } from './entities/profesional.entity';



export class ProfesionalMapper {

  static toEntity(profesionalDto: ProfesionalDTO): Profesional {
    return plainToClass(Profesional, profesionalDto);
  }


//   static toDto(persona: Persona): PersonaDTO{
//     return plainToClass(PersonaDTO, persona);
//   }
}