import { Persona } from 'src/persona';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario extends Persona {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  tipo: string;
}
