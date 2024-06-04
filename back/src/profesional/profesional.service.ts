import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Profesional } from './entities/profesional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

@Injectable()
export class ProfesionalService {

    constructor(
        @InjectRepository(Profesional)
        private readonly profesionalRepo: Repository<Profesional>,


      ) {}

    
  public async getProfesionalByDni(dni: number) {
    const condition: FindOneOptions<Profesional> = { relations :['persona'] ,where: { dni_profesional: dni } };
    const profesional: Profesional = await this.profesionalRepo.findOne(condition);
    if(!profesional){
      throw new NotFoundException("El profesional no está registrado");
    }
    return profesional;
  }
}
