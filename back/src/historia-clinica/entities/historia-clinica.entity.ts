import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'historias_clinicas' })
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  historiaClinicaId: number;

  @Column('longtext', {nullable:true})
  detalle: string;

  @Column()
  fechaCreacion: Date;

  @Column()
  ultimaModificacion: Date;


  @OneToOne(()=> Paciente, paciente => paciente.historiaClinica, {cascade: true, eager:true, nullable:false})
  @JoinColumn({name:'dniPaciente'})
  paciente: Paciente;

  @ManyToOne(()=> Usuario, usuario => usuario.username, {cascade: true, eager:true, nullable:true})
  @JoinColumn({name:'usuarioUltimaActualizacion'})
  usuario: Usuario;


}
