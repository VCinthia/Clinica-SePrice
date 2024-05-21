import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'personas' })
export class Persona {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    fechaNac: Date;
    @Column()
    dni: number;

    // @OneToOne(()=> Login)
    // login : Login;

    constructor(nombre: string, apellido: string, fechaNac: Date, dni : number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNac = fechaNac;
        this.dni = dni;
    }

    public getIdPersona(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }
    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public getFechaNac(): Date {
        return this.fechaNac;
    }
    public setFechaNac(fechaNac: Date): void {
        this.fechaNac = fechaNac;
    }

    public getDni(): number {
        return this.dni;
    }
    public setDni(dni: number): void {
        this.dni = dni;
    }
}