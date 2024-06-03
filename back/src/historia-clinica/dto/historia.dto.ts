import { IsNotEmpty, IsOptional } from "class-validator";

export class HistoriaClinicaDTO {
    //@IsNotEmpty()    
    historia_clinica_id?: number;
    @IsNotEmpty()
    dni_paciente: number;
    @IsNotEmpty()
    detalle : string;
    @IsNotEmpty()
    fecha_creacion : Date;
    @IsOptional()
    ultima_actualizacion : Date;
    // @IsNotEmpty()
    // usuario_ultima_actualizacon : Usuario;
}