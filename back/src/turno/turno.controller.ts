import { Body, Controller, Get,  Post } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoDTO } from './dto/turno.dto';

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

}
