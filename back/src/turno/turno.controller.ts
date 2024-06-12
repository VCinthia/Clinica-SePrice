import { Body, Controller, Get,  Param,  Patch,  Post, Put, Query } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoDTO } from './dto/turno.dto';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { Turno } from './entities/turno.entity';
import { eTipoTurno } from 'src/enums/tipo-turno.enum';
import { eEstadoTurno } from 'src/enums/estado-turno.enum';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { log } from 'console';

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
    async getTurnosEnCursoByTipoAndProfesionalAndDay(
      @Query('tipo') tipo: eTipoTurno,
      @Query('profesionalId') profesionalId: number,
      @Query('fechaTurnoISO') fechaTurno: string
    ): Promise<Turno[]> {
      log("fechaController: ",fechaTurno)
      const fechaTurnoDate = new Date(fechaTurno);;
      
      // Asegurar que es un string primitivo
      return this.turnoService.getTurnosEnCursoByTipoAndProfesionalAndDay(tipo, profesionalId, fechaTurnoDate);
    }



    @Patch('/estado')
    async actualizarEstadoDelTurno(@Body() body: { id: number; estado: eEstadoTurno }): Promise<ResponseDTO<Turno>> {
      const { id, estado } = body;
      return this.turnoService.patchEstadoDelTurno(id, estado);
    }

}
