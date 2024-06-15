import { eEspecialidad } from "../enums/especialidad.enum";
import { eEstadoTurno } from "../enums/estado-turno.enum";
import { eModalidadDePago } from "../enums/modalidad-de-pago.enum";
import { eTipoTurno } from "../enums/tipo-turno.enum";
import { PacienteDTO } from "./paciente.dto";
import { ProfesionalDTO } from "./profesional.dto";

export class TurnoDTO {
    turnoId? : number  | undefined;
    tipo?: eTipoTurno;
    inicioFechaHora?: Date;
    duracionMinutos?: number;
    esSobreturno?: boolean;
    especialidad?: eEspecialidad;
    estado?: eEstadoTurno;
    modalidadPago?: eModalidadDePago;
    paciente?: PacienteDTO;
    profesional?: ProfesionalDTO;


    constructor(
        tipo?: eTipoTurno,
        inicioFechaHora?: Date,
        duracionMinutos?: number,
        esSobreturno?: boolean,
        especialidad?: eEspecialidad,
        estado?: eEstadoTurno,
        modalidadPago?: eModalidadDePago,
        paciente?: PacienteDTO,
        profesional?: ProfesionalDTO
    ) {
        this.tipo = tipo;
        this.inicioFechaHora = inicioFechaHora;
        this.duracionMinutos = duracionMinutos;
        this.esSobreturno = esSobreturno;
        this.especialidad = especialidad;
        this.estado = estado;
        this.modalidadPago = modalidadPago;
        this.paciente = paciente;
        this.profesional = profesional;
    }

}