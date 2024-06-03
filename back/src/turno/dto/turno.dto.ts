import { IsNotEmpty } from "class-validator";

export class TurnoDTO {
    @IsNotEmpty()
    turnoID : number;
    @IsNotEmpty()
    dniPaciente : number;
    @IsNotEmpty()
    dniProfesional: number;
    @IsNotEmpty()
    tipo: string;
    @IsNotEmpty()
    inicioFechaHora: Date;
    @IsNotEmpty()
    duracionMinutos: number;
    @IsNotEmpty()
    esSobreturno: boolean;
    @IsNotEmpty()
    estado: string;
  
}
