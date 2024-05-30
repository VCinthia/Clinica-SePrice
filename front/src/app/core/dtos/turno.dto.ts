import { eEstadoTurno } from "../enums/estado-turno.enum";
import { eTipoTurno } from "../enums/tipo-turno.enum";

export class TurnoDTO {
    turno_id?:number;
    dni_paciente?:number;
    dni_profesional?:number;
    tipo?:eTipoTurno;
    inicio_fecha_hora?:Date;
    duracion_minutos?:number;
    es_sobreturno?:boolean;
    estado?:eEstadoTurno;
}