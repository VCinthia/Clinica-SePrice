import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { eEspecialidad } from 'src/enums/especialidad.enum';

@Entity({ name: 'profesionales' })
export class Profesional {
  @PrimaryColumn()
  dni_profesional: number;

  @Column({
    type:'enum',
    enum: eEspecialidad
  })
  especialidad: eEspecialidad;

  //cascade:true, sirve para  insertar,eliminar,actualizar las entidades relacionadas 
  //eager:true indica que se debe cargar automáticamente la entidad relacionada junto con la entidad principal cuando se recupera esta última de la base de datos.
@OneToOne(() => Persona, persona => persona.profesional, { cascade: false, eager: true }) 
@JoinColumn({ name: 'dni_profesional' })
  persona: Persona;
}