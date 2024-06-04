import { eModalidadDePago } from 'src/enums/modalidad-de-pago.enum';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
//import { HistoriaClinica } from './historia-clinica.entity'; // Crear Entidad

@Entity({ name: 'pacientes' })
export class Paciente {
  @PrimaryColumn()
  dni_paciente: number;

  @Column({
    type:'enum',
    enum: eModalidadDePago
  })
  modalidadPago: eModalidadDePago;

  //cascade:true, sirve para  insertar,eliminar,actualizar las entidades relacionadas 
  //eager:true indica que se debe cargar automáticamente la entidad relacionada junto con la entidad principal cuando se recupera esta última de la base de datos.
  @OneToOne(() => Persona, persona => persona.usuario, { cascade: false, eager: true }) // Hacemos la relación obligatoria para el paciente
  @JoinColumn({ name: 'dni_paciente' })
  persona: Persona;

}
