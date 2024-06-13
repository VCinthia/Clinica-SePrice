import { eEspecialidad } from "src/enums/especialidad.enum";
import { eEstadoTurno } from "src/enums/estado-turno.enum";
import { eModalidadDePago } from "src/enums/modalidad-de-pago.enum";
import { eTipoTurno } from "src/enums/tipo-turno.enum";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { Profesional } from "src/profesional/entities/profesional.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'turnos' })
export class Turno {
    @PrimaryGeneratedColumn()
    turnoId: number;
    
    @Column({
        type:'enum',
        enum:eTipoTurno
    })
    tipo: eTipoTurno;

    @Column()
    inicioFechaHora: Date;
    @Column()
    duracionMinutos: number;
    @Column()
    esSobreturno: boolean;
    @Column()
    especialidad: eEspecialidad;
    
    @Column({
        type:'enum',
        enum:eEstadoTurno
    })
    estado: eEstadoTurno;

    @Column({
        type:'enum',
        enum:eModalidadDePago,
        nullable: true
    })
    modalidadPago?: eModalidadDePago;

    @ManyToOne(()=> Paciente, paciente => paciente.dniPaciente, {cascade: true, eager:true, nullable:false})
    @JoinColumn({name:'dniPaciente'})
    paciente: Paciente;

    @ManyToOne(()=> Profesional, profesional => profesional.dniProfesional, {cascade: true, eager:true, nullable:false})
    @JoinColumn({name:'dniProfesional'})
    profesional: Profesional;



     //lo comenté porque no se usa
    // constructor(turnoID: number, dniPaciente: number, dniProfesional: number, tipo: string, inicioFechaHora: Date,duracionMinutos: number ,esSobreturno: boolean, estado: string) {
    //     this.turnoID = turnoID;
    //     this.dniPaciente = dniPaciente;
    //     this.dniProfesional = dniProfesional;
    //     this.tipo = tipo   
    //     this.inicioFechaHora = inicioFechaHora;
    //     this.duracionMinutos = duracionMinutos;  
    //     this.esSobreturno = esSobreturno;  
    //     this.estado = estado;      
    // }

    // public getTurnoID(): number {
    //     return this.turnoID;
    // }
    // public setTurnoID(turnoID: number): void {
    //     this.turnoID = turnoID;
    // }
    // public getDniPaciente(): number {
    //     return this.dniPaciente;
    // }
    // public setDniPaciente(dniPaciente: number): void {
    //     this.dniPaciente = dniPaciente;
    // }
    // public getDniProfesional(): number {
    //     return this.dniProfesional;
    // }
    // public setDniProfesional(dniProfesional: number): void {
    //     this.dniProfesional = dniProfesional;
    // }
    // public getTipo(): string {
    //     return this.tipo 
    // }
    // public setTipo(tipo: string): void {
    //     this.tipo = tipo
    // }
    // public getInicioFechaHora(): Date {
    //     return this.inicioFechaHora;
    // }
    // public setInicioFechaHora(inicioFechaHora: Date): void {
    //     this.inicioFechaHora = inicioFechaHora;
    // }
    // public getDuracionMinutos(): number {
    //     return this.duracionMinutos;
    // }
    // public setDuracionMinutos(duracionMinutos: number): void {
    //     this.duracionMinutos = duracionMinutos;
    // }
    // public getEsSobreturno(): boolean {
    //     return this.esSobreturno;
    // }
    // public setEsSobreturno(esSobreturno: boolean): void {
    //     this.esSobreturno = esSobreturno;
    // }
    // public getEstado(): string {
    //     return this.estado;
    // }
    // public setEstado(estado: string): void {
    //     this.estado = estado;
    // }
}