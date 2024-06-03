import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'turno' })
export class Turno {
    @PrimaryColumn()
    turnoID: number;
    //FK de tabla paciente
    @Column()
    dniPaciente: number;
    //FK tabla Profesional
    @Column()
    dniProfesional: number;
    @Column()
    tipo: string;
    @Column()
    inicioFechaHora: Date;
    @Column()
    duracionMinutos: number;
    @Column()
    esSobreturno: boolean;
    @Column()
    estado: string;


    constructor(turnoID: number, dniPaciente: number, dniProfesional: number, tipo: string, inicioFechaHora: Date,duracionMinutos: number ,esSobreturno: boolean, estado: string) {
        this.turnoID = turnoID;
        this.dniPaciente = dniPaciente;
        this.dniProfesional = dniProfesional;
        this.tipo = tipo   
        this.inicioFechaHora = inicioFechaHora;
        this.duracionMinutos = duracionMinutos;  
        this.esSobreturno = esSobreturno;  
        this.estado = estado;      
    }

    public getTurnoID(): number {
        return this.turnoID;
    }
    public setTurnoID(turnoID: number): void {
        this.turnoID = turnoID;
    }
    public getDniPaciente(): number {
        return this.dniPaciente;
    }
    public setDniPaciente(dniPaciente: number): void {
        this.dniPaciente = dniPaciente;
    }
    public getDniProfesional(): number {
        return this.dniProfesional;
    }
    public setDniProfesional(dniProfesional: number): void {
        this.dniProfesional = dniProfesional;
    }
    public getTipo(): string {
        return this.tipo 
    }
    public setTipo(tipo: string): void {
        this.tipo = tipo
    }
    public getInicioFechaHora(): Date {
        return this.inicioFechaHora;
    }
    public setInicioFechaHora(inicioFechaHora: Date): void {
        this.inicioFechaHora = inicioFechaHora;
    }
    public getDuracionMinutos(): number {
        return this.duracionMinutos;
    }
    public setDuracionMinutos(duracionMinutos: number): void {
        this.duracionMinutos = duracionMinutos;
    }
    public getEsSobreturno(): boolean {
        return this.esSobreturno;
    }
    public setEsSobreturno(esSobreturno: boolean): void {
        this.esSobreturno = esSobreturno;
    }
    public getEstado(): string {
        return this.estado;
    }
    public setEstado(estado: string): void {
        this.estado = estado;
    }
}