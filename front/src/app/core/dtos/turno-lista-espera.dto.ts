export class TurnoListaDeEspera {
    paciente: string;
    horario: Date;
    profesional: string;
    numAtencion: number;
    idTurno: number;


    constructor(
        paciente: string,
        horario: Date,
        profesional: string,
        numAtencion: number,
        idTurno: number
    ) {
        this.paciente = paciente;
        this.horario = horario;
        this.profesional = profesional;
        this.numAtencion = numAtencion;
        this.idTurno = idTurno;
    }

  }
