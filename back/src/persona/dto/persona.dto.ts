import { IsNotEmpty } from "class-validator";

export class PersonaDTO {
    id? : number;//ver de usar un classvalidator para que pueda estar vacio para la creacion
    @IsNotEmpty()
    nombre : string;
    @IsNotEmpty()
    apellido : string;
    @IsNotEmpty()
    fechaNac : Date;
    @IsNotEmpty()
    dni : number;
}