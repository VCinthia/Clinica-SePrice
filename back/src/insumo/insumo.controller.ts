import { Body, Controller, Get, Post } from '@nestjs/common';
import { Insumo } from './entities/insumo.entity';
import { InsumoService } from './insumo.service';
import { InsumoDTO } from './dto/insumo.dto';

@Controller('insumo')
export class InsumoController {
    constructor(private readonly insumoService: InsumoService) {}


    @Post()
    public async createInsumo(@Body() insumoDto: InsumoDTO) {
      return this.insumoService.createInsumo(insumoDto);
    }


    @Get("all")
    public async getAllInsumos() {
      return this.insumoService.getAllInsumos();
    }
}
