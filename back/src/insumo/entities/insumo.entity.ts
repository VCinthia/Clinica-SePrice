import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'insumos' })
export class Insumo {
    @PrimaryGeneratedColumn()
    insumoId: number;

    @Column()
    descripcion: string;

    @Column()
    cantidadDisponible: number;

    @Column()
    fechaUltimaModificacion: Date;

    @ManyToOne(()=> Usuario, usuario => usuario.username, {cascade: true, eager:true, nullable:false})
    @JoinColumn({name:'usuarioUltimaModificacion'})
    usuario: Usuario;


}