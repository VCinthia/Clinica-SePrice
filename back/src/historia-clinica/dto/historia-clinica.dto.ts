import { PacienteDTO } from "src/paciente/dto/paciente.dto";
import { UsuarioDTO } from "src/usuario/dto/usuario.dto";

export class HistoriaClinicaDTO {   
    historiaClinicaId?: number;  //id autogenerada
    detalle ?: string;
    fechaCreacion : Date;
    ultimaModificacion : Date;
    paciente: PacienteDTO;
    usuario: UsuarioDTO
 
}