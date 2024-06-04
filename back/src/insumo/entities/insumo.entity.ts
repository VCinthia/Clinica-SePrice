import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'insumos' })
export class Insumo {
    @PrimaryColumn()
    insumoId: number;

    @Column()
    descripcion: string;

    @Column()
    cantidadDisponible: number;

    @Column()
    fechaUltimaModificacion: Date;

    @OneToOne(()=> Usuario, usuario => usuario.username, {cascade: true, eager:true, nullable:false})
    @JoinColumn({name:'usuarioUltimaModificacion'})
    usuario: Usuario;



    //lo comenté porque no se usa
    // constructor(insumoID: number, descripcion: string, cantidadDisponible: number, fechaUltimaModificacion: Date, usuarioUltimaModificacion: string) {
    //     this.insumoID = insumoID;
    //     this.descripcion = descripcion;
    //     this.cantidadDisponible = cantidadDisponible;
    //     this.fechaUltimaModificacion = fechaUltimaModificacion;
    //     this.usuarioUltimaModificacion = usuarioUltimaModificacion;    
    // }

    // public getInsumoID(): number {
    //     return this.insumoID;
    // }
    // public setInsumoID(insumoID: number): void {
    //     this.insumoID = insumoID;
    // }
    // public getDescripcion(): string {
    //     return this.descripcion;
    // }
    // public setDescripcion(descripcion: string): void {
    //     this.descripcion = descripcion;
    // }
    // public getCantidadDisponible(): number {
    //     return this.cantidadDisponible;
    // }
    // public setCantidadDisponible(cantidadDisponible: number): void {
    //     this.cantidadDisponible = cantidadDisponible;
    // }
    // public getFechaUltimaModificacion(): Date {
    //     return this.fechaUltimaModificacion;
    // }
    // public setFechaUltimaModificacion(fechaUltimaModificacion: Date): void {
    //     this.fechaUltimaModificacion = fechaUltimaModificacion;
    // }
    // public getUsuarioUltimaModificacion(): string {
    //     return this.usuarioUltimaModificacion;
    // }
    // public setUsuarioUltimaModificacion(usuarioUltimaModificacion: string): void {
    //     this.usuarioUltimaModificacion = usuarioUltimaModificacion;
    // }
}