import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { eEstadoUsuario } from 'src/enums/estado-usuario.enum';
import { eGrupo } from 'src/enums/grupo.enum';
import { eTipoUsuario } from 'src/enums/tipo-usuario.enum';
import { HistoriaClinicaDTO } from 'src/historia-clinica/dto/historia-clinica.dto';
import { PersonaDTO } from 'src/persona/dto/persona.dto';

export class UsuarioDTO 
{
  @IsNotEmpty()
  username: string;
  password: string;
  tipo: eTipoUsuario; 
  estado: eEstadoUsuario;
  grupo: eGrupo;
  @ValidateNested()
  @Type(() => PersonaDTO)
  persona: PersonaDTO;
  usuario?: UsuarioDTO;
  historiasClnicas?: HistoriaClinicaDTO[];
}
