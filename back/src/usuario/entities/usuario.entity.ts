import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  tipo: string; // ADMIN - PROFESIONAL

  @Column()
  grupo: string; // LABORATORIO - EXTERNOS - AMBOS

  @OneToOne(() => Persona, persona => persona.username)
  persona: Persona;
}
