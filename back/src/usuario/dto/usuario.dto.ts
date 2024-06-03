import { IsNotEmpty, IsOptional } from 'class-validator';
import { Persona } from 'src/persona/entities/persona.entity';

export class UsuarioDTO //extends PersonaDTO 
{
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  password: string;
  
  @IsNotEmpty()
  //@IsIn(['ADMIN', 'PROFESIONAL'])
  tipo: string; //ADMIN - PROFESIONAL

  @IsNotEmpty()
  //@IsIn(['LABORATORIO', 'EXTERNOS', 'AMBOS'])
  grupo: string; //LABORATORIO - EXTERNOS - AMBOS

  persona?: Persona;
}
