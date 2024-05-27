import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteDTO } from './dto/paciente.dto';

@Injectable()
export class PacienteService {
    personaNotFound = 'No existe la persona.';
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepo: Repository<Paciente>,
    ) { }

    public async createPaciente(pacienteDTO: PacienteDTO) {
        try {
            //TODO: agregar verificacion de dni para crear
            const condition: FindOneOptions = { where: { dni: pacienteDTO.dni } };
            const pacienteExistente: Paciente = await this.pacienteRepo.findOne(condition);
            console.log('Entre a la funcion');
            console.log('Paciente.dni: ', pacienteDTO.dni);
            console.log('pacienteExistente: ', pacienteExistente);

            if (!pacienteExistente) {
                const newPaciente = this.pacienteRepo.create(pacienteDTO);
                console.log('newPaciente.dni: ', newPaciente.dni);
                return this.pacienteRepo.save(newPaciente);
            }
            else
                throw new Error('La persona ya existe.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Falló la creación - ' + error
            },
                HttpStatus.NOT_FOUND);
        }
    }

    public async getPacienteByDNI(dni: number) {
        try {
            const condition : FindOneOptions = { where : { dni : dni}};
            const paciente : Paciente = await this.pacienteRepo.findOne(condition);
            if(paciente){
                return paciente;
            } else {
                throw new Error('No existe el DNI ingresado.');
            }
        }catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la busqueda: ' + error
            },
        HttpStatus.NOT_FOUND);
        }
    }
}
