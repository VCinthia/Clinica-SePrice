import { IsNotEmpty } from "class-validator";
import { eEspecialidad } from "src/enums/especialidad.enum";
import { eEstadoTurno } from "src/enums/estado-turno.enum";
import { eModalidadDePago } from "src/enums/modalidad-de-pago.enum";
import { eTipoTurno } from "src/enums/tipo-turno.enum";
import { PacienteDTO } from "src/paciente/dto/paciente.dto";
import { ProfesionalDTO } from "src/profesional/dto/profesional.dto";

export class TurnoDTO {
    turnoId : number; //id autogenerada
    tipo: eTipoTurno;
    inicioFechaHora: Date;
    duracionMinutos: number;
    esSobreturno: boolean;
    especialidad: eEspecialidad;
    estado: eEstadoTurno;
    modalidadPago?: eModalidadDePago;
    
    @IsNotEmpty()
    paciente: PacienteDTO;
    
    @IsNotEmpty()
    profesional : ProfesionalDTO;
  
}
