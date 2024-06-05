import { UsuarioDTO } from "./usuario.dto";

export class InsumoDTO {
    insumoId? : number; //id autogenerada
    descripcion? : string;
    cantidadDisponible? : number;
    fechaUltimaModificacion? : Date;
    usuario? : UsuarioDTO;
}

