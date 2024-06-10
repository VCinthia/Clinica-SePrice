import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteDTO } from './dto/paciente.dto';
import { Persona } from 'src/persona/entities/persona.entity';
import { log } from 'console';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { PersonaDTO } from 'src/persona/dto/persona.dto';
import { PersonaMapper } from 'src/persona/persona.mapper';
import { HistoriaClinica } from 'src/historia-clinica/entities/historia-clinica.entity';
import { HistoriaClinicaService } from 'src/historia-clinica/historia-clinica.service';
import { PacienteResponse } from 'src/Utils/types';



@Injectable()
export class PacienteService {
    personaNotFound = 'No existe la persona.';
    constructor(
        @InjectRepository(Paciente)
        private readonly pacienteRepo: Repository<Paciente>,
        @InjectRepository(Persona)
        private readonly personaRepo: Repository<Persona>,
        private readonly historiaClinicaService: HistoriaClinicaService,

    ) { }


    public async createPaciente(personaDTO: PersonaDTO): Promise<ResponseDTO<PacienteResponse>> {
      try {
              // Validación:  la persona no debe tener un profesional
      if (personaDTO.profesional) {
        throw new HttpException('No es posible registrar al paciente, con un profesional', HttpStatus.BAD_REQUEST);
      }
        
        //TypeORM: asegurarse que los parametros del "where" no sean  null, si esto pasa TypeORM busca por defecto con el valor "1"
      if (personaDTO.dni) {
        // Validación: reviso que no exista la persona en la DDBB 
        const personaExiste = await this.personaRepo.findOne({ where: { dni: personaDTO.dni } });
        if (personaExiste) {
          throw new HttpException('La persona ya está registrada.', HttpStatus.BAD_REQUEST);
        }

        // Validación: reviso que no exista un paciente con el mismo DNI en la DDBB
        const pacienteExiste = await this.pacienteRepo.findOne({ where: { dniPaciente: personaDTO.dni } });
        if (pacienteExiste) {
          console.log("paciente: ", pacienteExiste);
          throw new HttpException(`Existe un paciente registrado con el DNI: ${personaDTO.dni}.`, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('El DNI es obligatorio para registrar un paciente.', HttpStatus.BAD_REQUEST);
      }

        // PacienteDTO to Entity
        const newPersona: Persona = PersonaMapper.toEntity(personaDTO);
        console.log("nuevo persona:", newPersona);
  
        // PERSISTENCIA
        const savedPersona = await this.personaRepo.save(newPersona);
        if(!savedPersona){
          throw new HttpException('Error al guardar la persona.', HttpStatus.BAD_REQUEST);
        }
  
        //Crear la Historia Clínica
        const historiaClinicaSaved: HistoriaClinica = (await this.historiaClinicaService.createHistoriaClinica(savedPersona.paciente)).data;
        if(!historiaClinicaSaved){
           throw new HttpException('Error a crear la historia clínica', HttpStatus.BAD_REQUEST);
        }

      // Retorno mensaje de éxito con datos del usuario guardado y la historia clínica
      const response: ResponseDTO<PacienteResponse> = new ResponseDTO<PacienteResponse>(true, "Paciente creado con éxito", {
        persona: savedPersona,
        historiaClinica: historiaClinicaSaved
      });
        return response;
        
      } catch (error) {
        console.error("error: ", error);
        throw new HttpException(error.message || "Error al registrar paciente", HttpStatus.BAD_REQUEST);
      }
    }



      public async getPacienteByDni(dni: number) {
        const condition: FindOneOptions<Paciente> = { relations :['persona'] ,where: { dniPaciente: dni } };
        const paciente: Paciente = await this.pacienteRepo.findOne(condition);
        if(!paciente){
          throw new NotFoundException("El paciente no existe");
        }
        return paciente;
      }


}
