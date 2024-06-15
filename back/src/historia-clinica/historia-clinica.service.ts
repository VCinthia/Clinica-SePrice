import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { HistoriaClinicaDTO } from './dto/historia-clinica.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { ResponseDTO } from 'src/Utils/responseDTO.dto';
import { log } from 'console';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepo: Repository<HistoriaClinica>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

  ) {}

  
  public async createHistoriaClinica(paciente: Paciente): Promise<ResponseDTO<HistoriaClinica>> {
    try {
    // Validación:  la persona no debe tener un profesional
    if (!paciente) {
      throw new HttpException('No se econtró el paciente para crear la Historia Clínica', HttpStatus.BAD_REQUEST);
    }
      const newHistoriaClinica = new HistoriaClinica();
      newHistoriaClinica.fechaCreacion = new Date();
      newHistoriaClinica.ultimaModificacion = new Date();
      newHistoriaClinica.paciente = paciente;

      // PERSISTENCIA
      const savedHistoriaClinica = await this.historiaClinicaRepo.save(newHistoriaClinica);

      // Retorno mensaje de éxito con datos del usuario guardado
      const response: ResponseDTO<HistoriaClinica> = new ResponseDTO(true, "Historia clinica creada", savedHistoriaClinica);
      return response;
      
    } catch (error) {
      console.error("error: ", error);
      throw new HttpException(error.message || "Error al crear Historia Clinica", HttpStatus.BAD_REQUEST);
    }
  }



  public async updateHistoriaClinica(historiaClinicaUpdated: HistoriaClinicaDTO, usuarioLogueadoUserName: string) : Promise<ResponseDTO<null>>{
    const historiaClinica = await this.historiaClinicaRepo.findOne({ 
      where: { 
        paciente: { dniPaciente: historiaClinicaUpdated.paciente.dniPaciente} } 
      });

    if (!historiaClinica) {
      throw new Error('La historia clínica no existe.');
    }

    const usuario = await this.usuarioRepo.findOne({ where: { username: usuarioLogueadoUserName }   });
    if (!usuario) {
      throw new Error('El usuario no existe.');
    }

    historiaClinica.detalle = historiaClinicaUpdated.detalle;
    historiaClinica.ultimaModificacion = new Date();
    historiaClinica.usuario = usuario;

    this.historiaClinicaRepo.save(historiaClinica);
    return new ResponseDTO(true, "La historia clinica ha sido actualizada", null)
  }




  public async getHistoriaClinica(dniPaciente: number): Promise<ResponseDTO<HistoriaClinica>> {
    //TypeORM: asegurarse que los parametros del "where" no sean  null, si esto pasa TypeORM busca por defecto con el valor "1"
    if (!dniPaciente) {
    throw new HttpException('El DNI es obligatorio para registrar un paciente.', HttpStatus.BAD_REQUEST);
    }
    log("entroooo")
    const historiaClinica = await this.historiaClinicaRepo.findOne({ 
      where: { 
        paciente: { dniPaciente: dniPaciente } }, relations: ['paciente'] });
    if (!historiaClinica) {
      throw new NotFoundException('La historia clínica no existe.');
    }
    const response = new ResponseDTO(true, "Historia clínica obtenida con éxito", historiaClinica)
    return response;
  }
}
