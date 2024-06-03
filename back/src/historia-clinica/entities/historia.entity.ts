import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'historias_clinicas' })
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  historia_clinica_id: number;

  @OneToOne(() => Paciente)
  @JoinColumn({ name: 'dni' })
  paciente: Paciente;

  @Column('text')
  detalles: string;

  @Column()
  fecha_creacion: Date;

  @Column()
  ultima_modificacion: Date;

//   @ManyToOne(() => Usuario)
//   @JoinColumn({ name: 'usuario_ultima_act' })
//   usuario_ultima_act: Usuario;
}
