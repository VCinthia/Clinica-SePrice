import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { eEspecialidad } from 'src/enums/especialidad.enum';

@Controller('profesional')
export class ProfesionalController {

    constructor(private readonly profesionalService: ProfesionalService) {}


    @Get('/dni/:dni')
    public async getProfesionalByDni(@Param('dni') dniProfesional: number) {
      return this.profesionalService.getProfesionalByDni(dniProfesional);
    }


    @Get('/especialidad')
    public async getProfesionalesByEspecialidad(@Query('especialidad') especialidad : eEspecialidad) {
      return this.profesionalService.getProfesionalesByEspecialidad(especialidad);
    }



}
