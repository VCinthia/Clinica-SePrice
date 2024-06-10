import { PacienteDTO } from "./paciente.dto";
import { UsuarioDTO } from "./usuario.dto";

export class HistoriaClinicaDTO {   
    historiaClinicaId?: number;  //id autogenerada
    detalle? : string;
    fechaCreacion? : Date; 
    ultimaModificacion? : Date;
    paciente?: PacienteDTO;
    usuario?: UsuarioDTO
 
}