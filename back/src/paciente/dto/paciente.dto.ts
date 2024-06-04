import { IsNotEmpty, IsOptional } from 'class-validator';
import { eModalidadDePago } from 'src/enums/modalidad-de-pago.enum';
import { PersonaDTO } from 'src/persona/dto/persona.dto';
import { Persona } from 'src/persona/entities/persona.entity';

export class PacienteDTO //extends PersonaDTO 
{
  @IsNotEmpty()
  dni_paciente: number;

  @IsNotEmpty()
  modalidadPago: eModalidadDePago;

  @IsNotEmpty()
  personaDto: PersonaDTO;
}