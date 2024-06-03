import { IsNotEmpty, IsOptional } from 'class-validator';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';
import { PersonaDTO } from 'src/persona/dto/persona.dto';
import { Persona } from 'src/persona/entities/persona.entity';
import { JoinColumn, OneToOne } from 'typeorm';

export class PacienteDTO //extends PersonaDTO 
{
  @IsNotEmpty()
  dni_paciente: number;

  @IsNotEmpty()
  modalidadPago: string;

  // @OneToOne(() => HistoriaClinica, historiaClinica => historiaClinica.paciente)
  // @JoinColumn()
  // historiaClinica: HistoriaClinica;

  persona?: Persona;
}