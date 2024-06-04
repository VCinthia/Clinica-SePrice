import { eEstadoUsuario } from "../enums/estado-usuario.enum";
import { eTipoUsuario } from "../enums/tipo-usuario.enum";
import { PersonaDTO } from "./persona.dto";

export class UsuarioDTO {
    username?:string;
    password?:string;
    estado?:eEstadoUsuario;
    tipo?:eTipoUsuario;
    grupo?:Date;
    personaDto?:PersonaDTO;
}