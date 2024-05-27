import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { PersonaDTO } from './dto/persona.dto';

@Injectable()
export class PersonaService {
    personaNotFound = 'No existe la persona.';

    constructor(
        @InjectRepository(Persona)
        private readonly personaRepo: Repository<Persona>,
    ) { }

    public async createPersona(personaDTO: PersonaDTO) {
        try {            
            //TODO: agregar verificacion de dni para crear
            const condition : FindOneOptions = { where : { dni : personaDTO.dni}};
            const personaExistente : Persona = await this.personaRepo.findOne(condition);
            console.log('Entre a la funcion');
            console.log( 'Persona.dni: ', personaDTO.dni);
            console.log('personaExistente: ', personaExistente);

            if (!personaExistente){
                let newPersona: Persona = await this.personaRepo.save(new Persona(personaDTO.dni,personaDTO.nombre, personaDTO.apellido, personaDTO.fechaNac, personaDTO.genero, personaDTO.domicilio, personaDTO.telefono, personaDTO.email));
                console.log('newPersona.dni: ', newPersona.dni);
                return newPersona;
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

    public async getPersonaByDNI(dni: number) {
        try {
            const condition : FindOneOptions = { where : { dni : dni}};
            const persona : Persona = await this.personaRepo.findOne(condition);
            if(persona) {
                return persona;
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
