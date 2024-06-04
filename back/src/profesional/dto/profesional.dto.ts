import { IsNotEmpty, IsOptional } from 'class-validator';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { Persona } from 'src/persona/entities/persona.entity';

export class ProfesionalDTO //extends PersonaDTO 
{
  @IsNotEmpty()
  dni_profesional: number;

  @IsNotEmpty()
  especialidad: eEspecialidad;

//   @IsNotEmpty()
//   persona: Persona;
}