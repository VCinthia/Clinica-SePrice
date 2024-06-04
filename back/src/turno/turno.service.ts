import { HttpException, HttpStatus, Injectable , NotFoundException } from '@nestjs/common';
import { TurnoDTO } from './dto/turno.dto';
import { Turno } from './entities/turno.entity';
import { TurnoMapper } from './turno.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteService } from 'src/paciente/paciente.service';
import { ProfesionalService } from 'src/profesional/profesional.service';

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
            //todo: reviso disponibilidad de turnos en la DDBB

    
            //busco el paciente en la DDBB
            const pacienteDB = await this.pacienteService.getPacienteByDni(turnoDto.pacienteDto.dni_paciente);
            if(!pacienteDB){
                throw new Error('No existe el paciente');
            }

            //busco el profesional en la DDBB
            const profesionalDB = await this.profesionalService.getProfesionalByDni(turnoDto.profesionalDto.dni_profesional);
            if(!profesionalDB){
                throw new Error('No existe el paciente');
            }


            //insumoDTO to Entity
            //agregar logica para que reciba solo el id de las fk y luego buscarlo en la DB para profesional

            const newTurno: Turno = TurnoMapper.toEntity(turnoDto);
            newTurno.paciente = pacienteDB;
            newTurno.profesional = profesionalDB;
            console.log("nuevo turno: ", newTurno);

            //Persistencia
            return this.turnoRepo.save(newTurno);

        } catch (error) {
            console.error(error)
            throw new HttpException({
              error: error
            }, HttpStatus.BAD_REQUEST);
          }
    }



    public async getAllTurnos(): Promise<Turno[]>  {
        const turnos = await this.turnoRepo.find();
        if(turnos?.length<=0){
            throw new NotFoundException("No hay turnos");
        }
        return turnos;
    }



}

    

