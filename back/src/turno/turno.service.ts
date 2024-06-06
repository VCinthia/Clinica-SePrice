import { BadRequestException, HttpException, HttpStatus, Injectable , InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TurnoDTO } from './dto/turno.dto';
import { Turno } from './entities/turno.entity';
import { TurnoMapper } from './turno.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteService } from 'src/paciente/paciente.service';
import { ProfesionalService } from 'src/profesional/profesional.service';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { eTipoTurno } from 'src/enums/tipo-turno.enum';

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

    
    public async getTurnosByTipoAndEspecialidadAndProfesionalDni(tipo: eTipoTurno, especialidadBuscada: eEspecialidad, profesionalDni: number) : Promise<Turno[]> {
        const turnosEncontrados =  await this.turnoRepo.find({
            where: {
                tipo: tipo,
                especialidad: especialidadBuscada,
                profesional: { dniProfesional: profesionalDni },
        }
        });
        console.log("turnosEncontrados: ", turnosEncontrados)
        if(turnosEncontrados.length <= 0){
          throw new NotFoundException("No se han encontrado turnos");
        }
        return turnosEncontrados;
      }

}

    

