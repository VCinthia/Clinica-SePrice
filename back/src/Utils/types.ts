import { HistoriaClinica } from "src/historia-clinica/entities/historia-clinica.entity";
import { Persona } from "src/persona/entities/persona.entity";

export type PacienteResponse = {
    persona: Persona;
    historiaClinica: HistoriaClinica;
  };