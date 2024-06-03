import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteDTO } from './dto/paciente.dto';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia.entity';
import { Persona } from 'src/persona/entities/persona.entity';

@Injectable()
export class PacienteService {
    personaNotFound = 'No existe la persona.';
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepo: Repository<Paciente>,
        @InjectRepository(Persona)
        private readonly personaRepo: Repository<Persona>,
        // @InjectRepository(HistoriaClinica)
        // private readonly historiaClinicaRepo: Repository<HistoriaClinica>,
    ) { }

    // public async createPaciente(pacienteDTO: PacienteDTO) {
    //     try {
    //         //TODO: agregar verificacion de dni para crear y de persona
    //         const condition: FindOneOptions = { where: { dni: pacienteDTO.dni_paciente } };
    //         const pacienteExistente: Paciente = await this.pacienteRepo.findOne(condition);
    //         console.log('Entre a la funcion');
    //         console.log('Paciente.dni: ', pacienteDTO.dni_paciente);
    //         console.log('pacienteExistente: ', pacienteExistente);

    //         if (!pacienteExistente) {
    //             let savedPersona: Persona;
    //             const newPaciente = this.pacienteRepo.create(pacienteDTO);
    //             console.log('newPaciente.dni: ', newPaciente.dni_paciente);
    //             //return this.pacienteRepo.save(newPaciente);
    //             const savedPaciente = await this.pacienteRepo.save(newPaciente);

    //             // // Crear la historia clínica asociada
    //             // const historiaClinica = new HistoriaClinica();
    //             // historiaClinica.paciente = savedPaciente;
    //             // historiaClinica.detalles = '';
    //             // historiaClinica.fecha_creacion = new Date();
    //             // historiaClinica.ultima_modificacion = new Date();
    //             // //historiaClinica.usuarioUltimaAct = null; // Inicialmente no hay usuario que haya actualizado

    //             // await this.historiaClinicaRepo.save(historiaClinica);
    //             return savedPaciente;
    //         } else
    //             throw new Error('La persona ya existe.');
    //     } catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.NOT_FOUND,
    //             error: 'Falló la creación - ' + error
    //         },
    //             HttpStatus.NOT_FOUND);
    //     }
    // }

    public async createPaciente(pacienteDTO: PacienteDTO ) {
        try {
          //TODO:verifica existencia de paciente y de persona PENDIENTE
          const condition: FindOneOptions<Paciente> = { where: { dni_paciente: pacienteDTO.dni_paciente } };
          //console.log("pacienteDTO: ",pacienteDTO);      
          const pacienteExistente: Paciente = await this.pacienteRepo.findOne(condition);
    
          if (!pacienteExistente) {
            let savedPersona: Persona;
            if (pacienteDTO.persona) {
              const personaCondition: FindOneOptions<Persona> = { where: { dni: pacienteDTO.persona.dni } };          
              const personaExistente = await this.personaRepo.findOne(personaCondition);
    
              if (!personaExistente) {
                const newPersona = this.personaRepo.create(pacienteDTO.persona);
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

    public async getPacienteByDNI(dni_paciente: number) {
        try {
            const condition: FindOneOptions = {relations :['persona'], where: { dni_paciente: dni_paciente } };
            const paciente: Paciente = await this.pacienteRepo.findOne(condition);
            if (paciente) {
                return paciente;
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
