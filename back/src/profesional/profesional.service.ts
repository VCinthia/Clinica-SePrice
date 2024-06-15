import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Profesional } from './entities/profesional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';

@Injectable()
export class ProfesionalService {

    constructor(
        @InjectRepository(Profesional)
        private readonly profesionalRepo: Repository<Profesional>,


      ) {}

    
  public async getProfesionalByDni(dni: number) {
    const condition: FindOneOptions<Profesional> = { relations :['persona'] ,where: { dniProfesional: dni } };
    const profesional: Profesional = await this.profesionalRepo.findOne(condition);
    if(!profesional){
      throw new NotFoundException("El profesional no está registrado");
    }
    return profesional;
  }


  public async getProfesionalesByEspecialidad(especialidad: eEspecialidad): Promise<ResponseDTO<Profesional[]>>  {

    const profesionalesEncontrados =  await this.profesionalRepo.find({
      where: {especialidad: especialidad}  });

    if(profesionalesEncontrados.length == 0){
      throw new NotFoundException("No existe un profesional para este tipo de especialidad");
    }
    // Retorno mensaje de éxito con datos del usuario guardado
    const response: ResponseDTO<Profesional[]> = new ResponseDTO(true, "Profesionales encontrados", profesionalesEncontrados);
    return response;

  }


}
