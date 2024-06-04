import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { eSexo } from 'src/enums/sexo.enum';
import { PacienteDTO } from 'src/paciente/dto/paciente.dto';
import { ProfesionalDTO } from 'src/profesional/dto/profesional.dto';
import { Profesional } from 'src/profesional/entities/profesional.entity';

export class PersonaDTO {
  @IsNotEmpty()
  dni: number;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @Type(() => Date)
  @IsNotEmpty()
  fechaNac: Date;

  sexo: eSexo;

  @IsNotEmpty()
  domicilio: string;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  username: string;

  @IsOptional()
  pacienteDto: PacienteDTO;

  @ValidateNested()
  @Type(() => ProfesionalDTO)
  @IsOptional()
  profesionalDto?: ProfesionalDTO;
}
