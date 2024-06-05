import { IsNotEmpty } from "class-validator";
import { eEstadoTurno } from "src/enums/estado-turno.enum";
import { eTipoTurno } from "src/enums/tipo-turno.enum";
import { PacienteDTO } from "src/paciente/dto/paciente.dto";
import { ProfesionalDTO } from "src/profesional/dto/profesional.dto";

export class TurnoDTO {
    turnoId : number; //id autogenerada
    tipo: eTipoTurno;
    inicioFechaHora: Date;
    duracionMinutos: number;
    esSobreturno: boolean;
    estado: eEstadoTurno;
    paciente: PacienteDTO;
    profesional : ProfesionalDTO;
  
}
