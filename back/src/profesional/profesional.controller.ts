import { Controller, Get, Param } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';

@Controller('profesional')
export class ProfesionalController {

    constructor(private readonly profesionalService: ProfesionalService) {}


    @Get(':dni')
    public async getProfesionalByDni(@Param('dni') dniProfesional: number) {
      return this.profesionalService.getProfesionalByDni(dniProfesional);
    }
}
