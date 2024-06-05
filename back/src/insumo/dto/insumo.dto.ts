import { UsuarioDTO } from "src/usuario/dto/usuario.dto";

export class InsumoDTO {
    insumoId? : number; //id autogenerada
    descripcion : string;
    cantidadDisponible : number;
    fechaUltimaModificacion : Date;
    usuario : UsuarioDTO;
}

