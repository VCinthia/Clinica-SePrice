import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteDTO } from './dto/paciente.dto';
import { Persona } from 'src/persona/entities/persona.entity';
import { log } from 'console';

@Injectable()
export class PacienteService {
    personaNotFound = 'No existe la persona.';
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepo: Repository<Paciente>,
        @InjectRepository(Persona)
        private readonly personaRepo: Repository<Persona>,

    ) { }


    public async createPaciente(pacienteDTO: PacienteDTO ) {
        try {
          //TODO:verifica existencia de paciente y de persona PENDIENTE
          const condition: FindOneOptions<Paciente> = { where: { dni_paciente: pacienteDTO.dni_paciente } };
          //console.log("pacienteDTO: ",pacienteDTO);      
          const pacienteExistente: Paciente = await this.pacienteRepo.findOne(condition);
    
          if (!pacienteExistente) {
            let savedPersona: Persona;
            if (pacienteDTO.personaDto) {
              const personaCondition: FindOneOptions<Persona> = { where: { dni: pacienteDTO.personaDto.dni } };          
              const personaExistente = await this.personaRepo.findOne(personaCondition);
    
              if (!personaExistente) {
                const newPersona = this.personaRepo.create(pacienteDTO.personaDto);
                console.log('newPersona: ', newPersona);
                
                savedPersona = await this.personaRepo.save(newPersona);
                console.log('savedPersona: ', savedPersona);
    
                const newPaciente = this.pacienteRepo.create({
                  ...pacienteDTO,
                  persona: savedPersona,
                });
                return this.pacienteRepo.save(newPaciente);
              }     else {
                throw new Error('La persona ya existe.');
              }     
              
            }        
          } else {
            throw new Error('El paciente ya existe.');
          }
        } catch (error) {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Falló la creación - ' + error,
          }, HttpStatus.NOT_FOUND);
        }
      }



      public async getPacienteByDni(dni: number) {
        const condition: FindOneOptions<Paciente> = { relations :['persona'] ,where: { dni_paciente: dni } };
        const paciente: Paciente = await this.pacienteRepo.findOne(condition);
        if(!paciente){
          throw new NotFoundException("El paciente no existe");
        }
        return paciente;
      }


}
