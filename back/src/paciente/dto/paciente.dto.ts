import { IsNotEmpty, IsOptional } from 'class-validator';
import { PersonaDTO } from 'src/persona/dto/persona.dto';

export class PacienteDTO extends PersonaDTO {
  @IsNotEmpty()
  modalidadPago: string;
}