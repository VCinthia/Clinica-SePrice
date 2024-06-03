import { IsNotEmpty } from "class-validator";

export class InsumoDTO {
    @IsNotEmpty()
    insumoID : number;
    @IsNotEmpty()
    descripcion : string;
    @IsNotEmpty()
    cantidadDisponible : number;
    @IsNotEmpty()
    fechaUltimaModificacion : Date;
    // Tambien deberia ser FK de la tabla Usuario
    @IsNotEmpty()
    usuarioUltimaModificacion : string;
  
}

