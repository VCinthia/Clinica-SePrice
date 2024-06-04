import { eSexo } from "../enums/sexo.enum";
import { PacienteDTO } from "./paciente.dto";
import { ProfesionalDTO } from "./profesional.dto";

export class PersonaDTO {
    dni?: number;
    nombre?: string;
    apellido?: string;
    fechaNac?: Date;
    sexo?: eSexo;
    domicilio?: string;
    telefono?: string;
    email?: string;
    username?: string;
    pacienteDto?: PacienteDTO;
    profesionalDto?: ProfesionalDTO;
}