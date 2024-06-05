import { eSexo } from "src/enums/sexo.enum";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { Profesional } from "src/profesional/entities/profesional.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'personas' })
export class Persona {
  @PrimaryColumn()
  dni: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fechaNac: Date;

  @Column({
    type: 'enum',
    enum: eSexo,
    nullable:true})
  sexo: eSexo;

  @Column()
  domicilio: string;

  @Column()
  telefono: string;

  @Column()
  email: string;

  @OneToOne(() => Usuario, (usuario) => usuario.persona, { nullable: true }) // Hacemos la relación opcional para el perfil
  usuario: Usuario;

  @OneToOne(() => Paciente, (paciente) => paciente.persona, { nullable: true, cascade: true })
  paciente: Paciente;

  //cascae:true cuando una persona se inserta, tambien se aplica al profesional
  @OneToOne(() => Profesional, profesional => profesional.persona, { nullable: true, cascade: true })
  profesional: Profesional;

}