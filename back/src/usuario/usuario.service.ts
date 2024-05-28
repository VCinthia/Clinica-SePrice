import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
    personaNotFound = 'No existe el usuario.';
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
    ) { }

    public async createUsuario(usuarioDTO: UsuarioDTO) {
        try {
            //TODO: agregar verificacion de dni para crear
            const condition: FindOneOptions = { where: { dni: usuarioDTO.dni } };
            const usuarioExistente: Usuario = await this.usuarioRepo.findOne(condition);
            console.log('Entre a la funcion');
            console.log('Usuario.dni: ', usuarioDTO.dni);
            console.log('usuarioExistente: ', usuarioExistente);

            if (!usuarioExistente) {
                const newUsuario = this.usuarioRepo.create(usuarioDTO);
                console.log('newUsuario.dni: ', newUsuario.dni);
                const savedUsuario = await this.usuarioRepo.save(newUsuario);

                return savedUsuario;
            } else
                throw new Error('El usuario ya existe.');

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Falló la creación - ' + error
            },
                HttpStatus.NOT_FOUND);
        }
    }

    public async getUsuarioByDNI(dni: number) {
        try {
            const condition: FindOneOptions = { where: { dni: dni } };
            const usuario: Usuario = await this.usuarioRepo.findOne(condition);
            if (usuario) {
                return usuario;
            } else {
                throw new Error('No existe el DNI ingresado.');
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la busqueda: ' + error
            },
                HttpStatus.NOT_FOUND);
        }
    }
}
