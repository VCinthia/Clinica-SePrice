import { eModalidadDePago } from "../enums/modalidad-de-pago.enum";
import { HistoriaClinicaDTO } from "./historia-clinica.dto";
import { PersonaDTO } from "./persona.dto";
import { TurnoDTO } from "./turno.dto";

export class PacienteDTO {
    dniPaciente?: number;
    modalidadPago?: eModalidadDePago;
    persona?: PersonaDTO;
    historiaClinica?: HistoriaClinicaDTO;
    turnos?: TurnoDTO[];
}