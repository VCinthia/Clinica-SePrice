import { IsNotEmpty, IsOptional } from 'class-validator';

export class PersonaDTO {
  @IsNotEmpty()
  dni: number;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsNotEmpty()
  fechaNac: Date;

  @IsNotEmpty()
  genero: string;

  @IsNotEmpty()
  domicilio: string;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  username?: string;
}
