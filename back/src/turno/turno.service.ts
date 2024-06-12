import { BadRequestException, HttpException, HttpStatus, Injectable , InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TurnoDTO } from './dto/turno.dto';
import { Turno } from './entities/turno.entity';
import { TurnoMapper } from './turno.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PacienteService } from 'src/paciente/paciente.service';
import { ProfesionalService } from 'src/profesional/profesional.service';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { eTipoTurno } from 'src/enums/tipo-turno.enum';
import { log } from 'console';
import { eEstadoTurno } from 'src/enums/estado-turno.enum';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { response } from 'express';

@Injectable()
export class TurnoService {

    constructor(
        @InjectRepository(Turno)
        private readonly turnoRepo: Repository<Turno>,
        private readonly pacienteService: PacienteService,
        private readonly profesionalService: ProfesionalService

      ) {}


    public async createTurno(turnoDto: TurnoDTO) {
        try{
            //Validacion de datos requeridos:
        if (!turnoDto.paciente || !turnoDto.paciente.dniPaciente) {
            throw new BadRequestException('El dni del paciente no puede ser nulo');
        }
        if (!turnoDto.profesional || !turnoDto.profesional.dniProfesional) {
            throw new BadRequestException('El dni del profesional no puede ser nulo');
        }


            //todo: reviso disponibilidad de turnos en la DDBB

    
            //busco el paciente en la DDBB
            const pacienteDB = await this.pacienteService.getPacienteByDni(turnoDto.paciente.dniPaciente);
            if(!pacienteDB){
                throw new Error('No existe el paciente');
            }

            //busco el profesional en la DDBB
            const profesionalDB = await this.profesionalService.getProfesionalByDni(turnoDto.profesional.dniProfesional);
            if(!profesionalDB){
                throw new Error('No existe el paciente');
            }


            //insumoDTO to Entity
            //El DTO recibe solo el Id del profesional y  paciente , luego se busca en la DB 
            const newTurno: Turno = TurnoMapper.toEntity(turnoDto);
            newTurno.paciente = pacienteDB;
            newTurno.profesional = profesionalDB;
            console.log("nuevo turno: ", newTurno);

            //Persistencia
            return this.turnoRepo.save(newTurno);

        } catch (error) {
        console.error(error)
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Datos enviados no válidos');
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error);
            }
           
            throw new InternalServerErrorException ('Error creando el turno');
          
      
        }   
        
    }



    public async getAllTurnos(): Promise<Turno[]>  {
        const turnos = await this.turnoRepo.find();
        if(turnos?.length<=0){
            throw new NotFoundException("No hay turnos");
        }
        return turnos;
    }

    
    public async getTurnosByTipoAndProfesionalAndEstadoAndDay(tipo: eTipoTurno, profesionalDni: number, fechaTurno: Date, estado:eEstadoTurno) : Promise<Turno[]> {
        log("FechaTurno", fechaTurno); //usar solo el dia, no la hora

       // Extraer año, mes y día
       const year = fechaTurno.getUTCFullYear();
       const month = fechaTurno.getUTCMonth(); 
       const day = fechaTurno.getUTCDate();
       
       
       // Obtener el inicio y el fin del día
       const startOfDay = new Date(Date.UTC(year, month, day));
       const endOfDay = new Date(Date.UTC(year, month, day + 1));
       endOfDay.getTime() - 1;   //2024-xx-xxT23:59:59.999Z

       log("***ini***", startOfDay);
       log("***fin***", endOfDay);

        const turnosEncontrados =  await this.turnoRepo.find({
            where: {
                tipo: tipo,
                profesional: { dniProfesional: profesionalDni },
                inicioFechaHora: Between(startOfDay, endOfDay),
                estado: estado,
        }
        });

        if(turnosEncontrados.length <= 0){
          throw new NotFoundException("No se han encontrado turnos");
        }
        // Filtro especialidad 
        const filteredTurnos = turnosEncontrados.filter(turno => turno.especialidad === turnosEncontrados[0].profesional.especialidad);

        console.log("turnosFiltrados: ", filteredTurnos);
        return filteredTurnos;
      }




      public async getTurnosByTipoAndEstadoAndDay(tipo: eTipoTurno, fechaTurno: Date,  estado:eEstadoTurno,) : Promise<Turno[]> {
        log("FechaTurno", fechaTurno); //usar solo el dia, no la hora
       // Extraer año, mes y día
       const year = fechaTurno.getUTCFullYear();
       const month = fechaTurno.getUTCMonth(); 
       const day = fechaTurno.getUTCDate();
       
       // Obtener el inicio y el fin del día
       const startOfDay = new Date(Date.UTC(year, month, day));
       const endOfDay = new Date(Date.UTC(year, month, day + 1));
       endOfDay.getTime() - 1;   //2024-xx-xxT23:59:59.999Z

        const turnosEncontrados =  await this.turnoRepo.find({
            where: {
                tipo: tipo,
                inicioFechaHora: Between(startOfDay, endOfDay),
                estado: estado,
        }
        });

        if(turnosEncontrados.length <= 0){
          throw new NotFoundException("No se han encontrado turnos");
        }
        console.log("turnosEncontrados: ", turnosEncontrados);
        return turnosEncontrados;
      }




   
      async patchEstadoDelTurno(idTurno: number, nuevoEstado: eEstadoTurno): Promise<ResponseDTO<Turno>> {
        // Buscar el turno en la base de datos
        const turnoDB = await this.turnoRepo.findOne({
            where: {
              turnoId: idTurno
            },
          });

        if (!turnoDB) {
            throw new NotFoundException(`El turno con ID  no fue encontrado.`);
        }
    
        // Actualizar el estado del turno
        turnoDB.estado = nuevoEstado;
    
        // Guardar los cambios en la base de datos
        const turnoActualizado = await this.turnoRepo.save(turnoDB);
        const response = new ResponseDTO(true, "El estado del turno ha sido actualizado", turnoActualizado)
        return response;
      }





    

}

    

