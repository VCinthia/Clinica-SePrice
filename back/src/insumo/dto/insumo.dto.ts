import { IsNotEmpty } from "class-validator";
import { UsuarioDTO } from "src/usuario/dto/usuario.dto";

export class InsumoDTO {
    @IsNotEmpty()
    insumoId : number;
    @IsNotEmpty()
    descripcion : string;
    @IsNotEmpty()
    cantidadDisponible : number;
    @IsNotEmpty()
    fechaUltimaModificacion : Date;
 
    @IsNotEmpty()
    usuarioUltimaModificacion : UsuarioDTO;
  
}

