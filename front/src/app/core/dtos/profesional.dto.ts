import { eEspecialidad } from "../enums/especialidad.enum";
import { PersonaDTO } from "./persona.dto";
import { TurnoDTO } from "./turno.dto";

export class ProfesionalDTO {
    dniProfesional?: number;
    especialidad?: eEspecialidad;
    persona?: PersonaDTO;
    turnos?: TurnoDTO[];

    constructor(dniProfesional: number, especialidad: eEspecialidad, persona: PersonaDTO, turnos: TurnoDTO[] = []) {
        this.dniProfesional = dniProfesional;
        this.especialidad = especialidad;
        this.persona = persona;
        this.turnos = turnos;
    }
    
}