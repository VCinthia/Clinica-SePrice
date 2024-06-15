import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { Turno } from 'src/turno/entities/turno.entity';

@Entity({ name: 'profesionales' })
export class Profesional {
  @PrimaryColumn()
  dniProfesional: number;

  @Column({
    type:'enum',
    enum: eEspecialidad
  })
  especialidad: eEspecialidad;

  //cascade:true, sirve para  insertar,eliminar,actualizar las entidades relacionadas 
  //eager:true indica que se debe cargar automáticamente la entidad relacionada junto con la entidad principal cuando se recupera esta última de la base de datos.
  @OneToOne(() => Persona, persona => persona.profesional, { cascade: false, eager: true }) 
  @JoinColumn({ name: 'dniProfesional' })
  persona: Persona;

  @OneToMany(() => Turno, (turno) => turno.profesional, { nullable: true }) // Hacemos la relación opcional para el perfil
  turnos: Turno[];
}