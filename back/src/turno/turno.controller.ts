import { Body, Controller, Get,  Param,  Patch,  Post, Put, Query } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoDTO } from './dto/turno.dto';
import { eEspecialidad } from 'src/enums/especialidad.enum';
import { Turno } from './entities/turno.entity';
import { eTipoTurno } from 'src/enums/tipo-turno.enum';
import { eEstadoTurno } from 'src/enums/estado-turno.enum';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { log } from 'console';
import { eModalidadDePago } from 'src/enums/modalidad-de-pago.enum';

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

    @Get('tipo-profesional')
    async getTurnosByTipoAndProfesionalAndEstadoAndDay(
      @Query('tipo') tipo: eTipoTurno,
      @Query('profesionalId') profesionalId: number,
      @Query('fechaTurnoISO') fechaTurno: string,
      @Query('estado') estado: eEstadoTurno
    ): Promise<Turno[]> {
      log("fechaController: ", fechaTurno)
      const fechaTurnoDate = new Date(fechaTurno);
      return this.turnoService.getTurnosByTipoAndProfesionalAndEstadoAndDay(tipo, profesionalId, fechaTurnoDate, estado);
    }


    @Get('tipo')
    async getTurnosByTipoAndEstadoAndDay(
      @Query('tipo') tipo: eTipoTurno,
      @Query('fechaTurnoISO') fechaTurno: string,
      @Query('estado') estado: eEstadoTurno
    ): Promise<Turno[]> {
      log("fechaController: ", fechaTurno)
      const fechaTurnoDate = new Date(fechaTurno);
      return this.turnoService.getTurnosByTipoAndEstadoAndDay(tipo, fechaTurnoDate, estado);
    }



    @Patch('estado')
    async actualizarEstadoDelTurno(@Body() body: { id: number; estado: eEstadoTurno }): Promise<ResponseDTO<Turno>> {
      const { id, estado } = body;
      return this.turnoService.patchEstadoDelTurno(id, estado);
    }


    @Patch('modalidad-pago')
    async actualizarModalidadPagoDelTurno(@Body() body: { id: number; modalidadPago: eModalidadDePago }): Promise<ResponseDTO<Turno>> {
      const { id, modalidadPago } = body;
      return this.turnoService.patchModalidadPagoDelTurno(id, modalidadPago);
    }

}
