import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { eTipoUsuario } from 'src/enums/tipo-usuario.enum';
import { eGrupo } from 'src/enums/grupo.enum';
import { Insumo } from 'src/insumo/entities/insumo.entity';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column({
    type:'enum',
    enum: eTipoUsuario
  })
  tipo: eTipoUsuario;

  @Column({
    type:'enum',
    enum:eGrupo,
    nullable: true,
  })
  grupo: eGrupo;

  //cascade:true, sirve para  insertar,eliminar,actualizar las entidades relacionadas 
  //eager:true indica que se debe cargar automáticamente la entidad relacionada junto con la entidad principal cuando se recupera esta última de la base de datos.
  @OneToOne(() => Persona, persona => persona.usuario, { cascade: true, eager: true, nullable: false }) // Hacemos la relación obligatoria para el usuario
  @JoinColumn()
  persona: Persona;

  @OneToOne(() => Insumo, (insumo) => insumo.usuario, { nullable: true }) // Hacemos la relación opcional para el perfil
  usuario: Usuario;
}
