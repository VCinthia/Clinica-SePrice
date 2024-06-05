import { eModalidadDePago } from 'src/enums/modalidad-de-pago.enum';
import { HistoriaClinicaDTO } from 'src/historia-clinica/dto/historia-clinica.dto';
import { PersonaDTO } from 'src/persona/dto/persona.dto';
import { Turno } from 'src/turno/entities/turno.entity';

export class PacienteDTO 
{
  dniPaciente: number;
  modalidadPago: eModalidadDePago;
  persona: PersonaDTO;
  historiaClinica: HistoriaClinicaDTO;
  turnos?: Turno[];
}