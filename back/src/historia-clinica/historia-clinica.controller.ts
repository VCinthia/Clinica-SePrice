import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaDTO } from './dto/historia-clinica.dto';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';

@Controller('historiaclinica')
export class HistoriaClinicaController {
  constructor(private readonly historiaClinicaService: HistoriaClinicaService) {}


  @Put('edit')
  updateHistoriaClinica(@Body() body: { historiaClinicaUpdated: HistoriaClinicaDTO, usuarioEditorUserName: string }): Promise<ResponseDTO<null>> {
    const { historiaClinicaUpdated, usuarioEditorUserName } = body;
    return this.historiaClinicaService.updateHistoriaClinica(historiaClinicaUpdated, usuarioEditorUserName);
  }

  @Get('dni/:dni')
  getHistoriaClinica(@Param('dni') dni: number): Promise<ResponseDTO<HistoriaClinica>> {
    return this.historiaClinicaService.getHistoriaClinica(dni);
  }
}
