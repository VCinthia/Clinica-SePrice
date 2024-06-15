import { eEstadoUsuario } from "../enums/estado-usuario.enum";
import { eGrupo } from "../enums/grupo.enum";
import { eTipoUsuario } from "../enums/tipo-usuario.enum";
import { HistoriaClinicaDTO } from "./historia-clinica.dto";
import { PersonaDTO } from "./persona.dto";

export class UsuarioDTO {
    username?: string;
    password?: string;
    tipo?: eTipoUsuario; 
    estado?: eEstadoUsuario;
    grupo?: eGrupo;
    persona?: PersonaDTO;
    usuario?: UsuarioDTO;
    historiasClnicas?: HistoriaClinicaDTO[];
}