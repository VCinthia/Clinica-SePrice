import { eTipoUsuario } from "../enums/tipo-usuario.enum";
import { PersonaDTO } from "./persona.dto";

export class UsuarioDTO {
    username?:string;
    password?:string;
    tipo?:eTipoUsuario;
    grupo?:Date;
    personaDto?:PersonaDTO;
}