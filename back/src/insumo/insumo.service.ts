import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Insumo } from './entities/insumo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { InsumoDTO } from './dto/insumo.dto';
import { InsumoMapper } from './insumo.mapper';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class InsumoService {

    constructor(
        @InjectRepository(Insumo)
        private readonly insumoRepo: Repository<Insumo>,
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly usuarioService: UsuarioService

      ) {}


      public async createInsumo(insumoDto: InsumoDTO) {
        try{
            //reviso que el isumo no exista en la DDBB
            const insumoExiste = await this.insumoRepo.findOne({where:{insumoId:insumoDto.insumoId}});
            if(insumoExiste != null){
                throw new Error('Existe un insumo con el mismo ID');
            }

            //busco el usuario en la DDBB
            let usuarioDB = await this.usuarioService.getUsuarioByUsername(insumoDto.usuario.username);
            if(!usuarioDB){
                throw new Error('No existe el usuario');
            }
            console.log("usuarioDB ", usuarioDB);
      
            //insumoDTO to Entity
            const newInsumo: Insumo = InsumoMapper.toEntity(insumoDto);
            newInsumo.usuario = usuarioDB;
            console.log("nuevo insumo: ", newInsumo);

        

            //Persistencia
            return this.insumoRepo.save(newInsumo);

        } catch (error) {
            console.error(error)
            throw new HttpException({
              error: error
            }, HttpStatus.BAD_REQUEST);
          }
    }



    public async getAllInsumos(): Promise<Insumo[]>  {
        const insumos = await this.insumoRepo.find();
        if(insumos?.length<=0){
          throw new NotFoundException("No hay insumos");
        }
        return insumos;
      }


}
