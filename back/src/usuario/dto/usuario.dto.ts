import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { eGrupo } from 'src/enums/grupo.enum';
import { eTipoUsuario } from 'src/enums/tipo-usuario.enum';
import { PersonaDTO } from 'src/persona/dto/persona.dto';

export class UsuarioDTO 
{
  @IsNotEmpty()
  username: string;
  

  password: string;
  

  tipo: eTipoUsuario; 

  grupo: eGrupo;

  @ValidateNested()
  @Type(() => PersonaDTO)
  persona: PersonaDTO;
}
