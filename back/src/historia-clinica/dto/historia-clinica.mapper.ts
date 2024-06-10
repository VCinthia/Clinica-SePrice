import { plainToClass } from "class-transformer";
import { HistoriaClinica } from "../entities/historia-clinica.entity";
import { HistoriaClinicaDTO } from "./historia-clinica.dto";
import { PacienteMapper } from "src/paciente/paciente.mapper";

export class HistoriaClinicaMapper {

    static toEntity(historiaClinicaDto: HistoriaClinicaDTO): HistoriaClinica {
      const histcli = plainToClass(HistoriaClinica, historiaClinicaDto);
      histcli.paciente = PacienteMapper.toEntity(historiaClinicaDto.paciente);
      return histcli
    }
  
  
    static toDto(historiaClinica: HistoriaClinica): HistoriaClinicaDTO{
      const histcliDTO = plainToClass(HistoriaClinicaDTO, historiaClinica);
      histcliDTO.paciente = PacienteMapper.toDto(historiaClinica.paciente);
      return histcliDTO;
    }
  }