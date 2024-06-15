import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { eSexo } from 'src/enums/sexo.enum';
import { PacienteDTO } from 'src/paciente/dto/paciente.dto';
import { ProfesionalDTO } from 'src/profesional/dto/profesional.dto';

export class PersonaDTO {
  dni: number;
  nombre: string;
  apellido: string;
  @Type(() => Date)
  fechaNac: Date;
  sexo: eSexo;
  domicilio: string;
  telefono: string;
  email: string;
  usuario: string;
  paciente?: PacienteDTO;
  @ValidateNested()
  @Type(() => ProfesionalDTO)
  @IsOptional()
  profesional?: ProfesionalDTO;
}
