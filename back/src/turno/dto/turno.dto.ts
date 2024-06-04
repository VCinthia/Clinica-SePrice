import { IsNotEmpty } from "class-validator";
import { eEstadoTurno } from "src/enums/estado-turno.enum";
import { eTipoTurno } from "src/enums/tipo-turno.enum";
import { PacienteDTO } from "src/paciente/dto/paciente.dto";
import { ProfesionalDTO } from "src/profesional/dto/profesional.dto";

export class TurnoDTO {
    turnoID : number;
    @IsNotEmpty()
    tipo: eTipoTurno;
    @IsNotEmpty()
    inicioFechaHora: Date;
    @IsNotEmpty()
    duracionMinutos: number;
    @IsNotEmpty()
    esSobreturno: boolean;
    @IsNotEmpty()
    estado: eEstadoTurno;

    @IsNotEmpty()
    pacienteDto: PacienteDTO;

    @IsNotEmpty()
    profesionalDto : ProfesionalDTO;
  
}
