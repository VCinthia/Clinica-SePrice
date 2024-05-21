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
            let newPersona: Persona = await this.personaRepo.save(new Persona(personaDTO.nombre, personaDTO.apellido, personaDTO.fechaNac, personaDTO.dni));
            if (newPersona)
                return newPersona;
            else
                throw new Error('La persona no pudo crearse.');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en la creacion: ' + error
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
