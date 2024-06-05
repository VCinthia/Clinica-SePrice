import { eEstadoTurno } from "../enums/estado-turno.enum";
import { eTipoTurno } from "../enums/tipo-turno.enum";
import { PacienteDTO } from "./paciente.dto";
import { ProfesionalDTO } from "./profesional.dto";

export class TurnoDTO {
    turnoId? : number;
    tipo?: eTipoTurno;
    inicioFechaHora?: Date;
    duracionMinutos?: number;
    esSobreturno?: boolean;
    estado?: eEstadoTurno;
    paciente?: PacienteDTO;
    profesional?: ProfesionalDTO;
}