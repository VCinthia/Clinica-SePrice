import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaDTO } from './dto/historia-clinica.dto';
import { HistoriaClinica } from './entities/historia-clinica.entity';

@Controller('historiaclinica')
export class HistoriaClinicaController {
  constructor(private readonly historiaClinicaService: HistoriaClinicaService) {}

  // @Post()
  // createHistoriaClinica(@Body() historiaClinicaDTO: HistoriaClinicaDTO): Promise<HistoriaClinica> {
  //   return this.historiaClinicaService.createHistoriaClinica(historiaClinicaDTO);
  // }

  // @Put('/:dni')
  // updateHistoriaClinica(
  //   @Param('dni') dni: number,
  //   @Body('detalles') detalles: string,
  //   //@Body('usuarioDni') usuarioDni: number
  // ): Promise<HistoriaClinica> {
  //   return this.historiaClinicaService.updateHistoriaClinica(dni, detalles, /*usuarioDni*/);
  // }

  // @Get('/:dni')
  // getHistoriaClinica(@Param('dni') dni: number): Promise<HistoriaClinica> {
  //   return this.historiaClinicaService.getHistoriaClinica(dni);
  // }
}
