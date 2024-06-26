import { eEspecialidad } from 'src/enums/especialidad.enum';
import { PersonaDTO } from 'src/persona/dto/persona.dto';
import { TurnoDTO } from 'src/turno/dto/turno.dto';
import { Turno } from 'src/turno/entities/turno.entity';

export class ProfesionalDTO 
{
  dniProfesional: number;
  especialidad: eEspecialidad;
  persona: PersonaDTO;
  turnos?: TurnoDTO[];
}