import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';
import { Persona } from 'src/persona';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
//import { HistoriaClinica } from './historia-clinica.entity'; // Crear Entidad

@Entity({ name: 'pacientes' })
export class Paciente extends Persona {
  @Column()
  modalidadPago: string;

  @OneToOne(() => HistoriaClinica, historiaClinica => historiaClinica.paciente)
  @JoinColumn()
  historiaClinica: HistoriaClinica;
}
