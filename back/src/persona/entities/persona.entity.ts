import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    // @ForeignKey(() => Usuario)
    // @Column
    private idLogin: number;

    constructor(dni: number, nombre: string, apellido: string, fechaNac: Date, genero: string, domicilio: string, telefono: string, email: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNac = fechaNac;
        this.genero = genero;
        this.domicilio = domicilio;
        this.telefono = telefono;
        this.email = email;
    }

    public getDni(): number {
        return this.dni;
    }
    public setDni(dni: number): void {
        this.dni = dni;
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

    public getgenero(): string {
        return this.genero;
    }
    public setGenero(genero: string): void {
        this.genero = genero;
    }

    public getDomicilio(): string {
        return this.domicilio;
    }
    public setDomicilio(domicilio: string): void {
        this.domicilio = domicilio;
    }

    public getTelefono(): string {
        return this.telefono;
    }
    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    }

    public getEmail(): string {
        return this.email;
    }
    public setEmail(email: string): void {
        this.email = email;
    }

}