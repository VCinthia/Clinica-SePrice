import { IsNotEmpty } from "class-validator";

export class LoginDTO {
    id ?: number;
    @IsNotEmpty()
    usuario : string;
    @IsNotEmpty()
    password : string;
}