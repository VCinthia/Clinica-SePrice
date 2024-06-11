import { Body, Controller, Get,  Param,  Post, Query } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoDTO } from './dto/turno.dto';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { Turno } from './entities/turno.entity';
import { eTipoTurno } from 'src/enums/tipo-turno.enum';

@Controller('turno')
export class TurnoController {

    constructor(private readonly turnoService: TurnoService) {}


    @Post()
    public async createTurno(@Body() turnoDto: TurnoDTO) {
      return this.turnoService.createTurno(turnoDto);
    }


    @Get('all')
    public async getAllTurnos() {
      return this.turnoService.getAllTurnos();
    }

    @Get('encurso')
    getTurnosEnCursoByTipoAndProfesionalAndDay(
      @Query('tipo') tipo: eTipoTurno,
      @Query('profesionalId') profesionalId: number,
      @Query('fechaTurnoISO') fechaTurno: String
    ): Promise<Turno[]> {
      const fechaTurnoDate = new Date(fechaTurno.toString());  // Asegurar que es un string primitivo
      return this.turnoService.getTurnosEnCursoByTipoAndProfesionalAndDay(tipo, profesionalId, fechaTurnoDate);
    }

}
