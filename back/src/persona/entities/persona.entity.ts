import { Paciente } from "src/paciente/entities/paciente.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
  @Column()
  genero: string;
  @Column()
  domicilio: string;
  @Column()
  telefono: string;
  @Column()
  email: string;

  //para crear usuario si es requerido
  @OneToOne(() => Usuario, usuario => usuario.persona)//, { cascade: true, nullable: true }
  @JoinColumn({ name: 'username' })
  username?: Usuario;

  @OneToOne(() => Paciente, paciente => paciente.persona)//, { cascade: true, nullable: true }
  //@JoinColumn({ name: 'dni_paciente' })
  paciente : Paciente;

}