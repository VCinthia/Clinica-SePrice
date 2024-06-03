import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
//import { HistoriaClinica } from './historia-clinica.entity'; // Crear Entidad

@Entity({ name: 'pacientes' })
export class Paciente //extends Persona 
{
  @PrimaryColumn()
  dni_paciente: number;

  @OneToOne(() => Persona, persona => persona.username)
  persona: Persona;
  
  @Column()
  modalidadPago: string;

  // @OneToOne(() => HistoriaClinica, historiaClinica => historiaClinica.paciente)
  // @JoinColumn()
  // historiaClinica: HistoriaClinica;
}
