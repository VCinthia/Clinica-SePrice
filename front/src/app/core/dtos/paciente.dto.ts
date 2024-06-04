import { eModalidadDePago } from "../enums/modalidad-de-pago.enum";
import { PersonaDTO } from "./persona.dto";

export class PacienteDTO {
    dni_paciente?: number;
    modalidadPago?: eModalidadDePago;
    personaDto?: PersonaDTO;
}