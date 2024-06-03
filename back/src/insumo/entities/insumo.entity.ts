import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'insumo' })
export class Insumo {
    @PrimaryColumn()
    insumoID: number;
    @Column()
    descripcion: string;
    @Column()
    cantidadDisponible: number;
    @Column()
    fechaUltimaModificacion: Date;
    //Esta tebdria que ser una FK de Usuario
    @Column()
    usuarioUltimaModificacion: string;


    constructor(insumoID: number, descripcion: string, cantidadDisponible: number, fechaUltimaModificacion: Date, usuarioUltimaModificacion: string) {
        this.insumoID = insumoID;
        this.descripcion = descripcion;
        this.cantidadDisponible = cantidadDisponible;
        this.fechaUltimaModificacion = fechaUltimaModificacion;
        this.usuarioUltimaModificacion = usuarioUltimaModificacion;    
    }

    public getInsumoID(): number {
        return this.insumoID;
    }
    public setInsumoID(insumoID: number): void {
        this.insumoID = insumoID;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
    public getCantidadDisponible(): number {
        return this.cantidadDisponible;
    }
    public setCantidadDisponible(cantidadDisponible: number): void {
        this.cantidadDisponible = cantidadDisponible;
    }
    public getFechaUltimaModificacion(): Date {
        return this.fechaUltimaModificacion;
    }
    public setFechaUltimaModificacion(fechaUltimaModificacion: Date): void {
        this.fechaUltimaModificacion = fechaUltimaModificacion;
    }
    public getUsuarioUltimaModificacion(): string {
        return this.usuarioUltimaModificacion;
    }
    public setUsuarioUltimaModificacion(usuarioUltimaModificacion: string): void {
        this.usuarioUltimaModificacion = usuarioUltimaModificacion;
    }
}