import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './entities/historia.entity';
import { HistoriaClinicaDTO } from './dto/historia.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepo: Repository<HistoriaClinica>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    // @InjectRepository(Usuario)
    // private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  public async createHistoriaClinica(historiaClinicaDTO: HistoriaClinicaDTO) {
    const paciente = await this.pacienteRepo.findOne({ where: { dni_paciente: historiaClinicaDTO.dni_paciente } });
    if (!paciente) {
      throw new Error('El paciente no existe.');
    }

    const nuevaHistoriaClinica = this.historiaClinicaRepo.create({
      ...historiaClinicaDTO,
      paciente,
      fecha_creacion: new Date(),
      ultima_modificacion: new Date(),
    });

    return this.historiaClinicaRepo.save(nuevaHistoriaClinica);
  }

  public async updateHistoriaClinica(dni_paciente: number, detalles: string/*, usuarioDni: number*/) {
    const historiaClinica = await this.historiaClinicaRepo.findOne({ where: { paciente: { dni_paciente } } });
    if (!historiaClinica) {
      throw new Error('La historia clínica no existe.');
    }

    // const usuario = await this.usuarioRepo.findOne({ where: { dni: usuarioDni } });
    // if (!usuario) {
    //   throw new Error('El usuario no existe.');
    // }

    historiaClinica.detalles = detalles;
    historiaClinica.ultima_modificacion = new Date();
    //historiaClinica.usuarioUltimaAct = usuario;

    return this.historiaClinicaRepo.save(historiaClinica);
  }

  public async getHistoriaClinica(dni_paciente: number): Promise<HistoriaClinica> {
    const historiaClinica = await this.historiaClinicaRepo.findOne({ where: { paciente: { dni_paciente } }, relations: ['paciente'/*, 'usuarioUltimaAct'*/] });
    if (!historiaClinica) {
      throw new NotFoundException('La historia clínica no existe.');
    }
    return historiaClinica;
  }
}
