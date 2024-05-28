import { IsNotEmpty, IsOptional } from 'class-validator';
import { PersonaDTO } from 'src/persona';

export class UsuarioDTO extends PersonaDTO {
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;
  
  @IsNotEmpty()
  tipo: string; //ADMIN - PROFESIONAL
}
