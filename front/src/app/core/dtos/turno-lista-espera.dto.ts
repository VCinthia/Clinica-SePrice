export class TurnoListaDeEspera {
    pacienteNombre: string;
    pacienteDNI: number;
    horario: Date;
    profesional: string;
    numAtencion: number;
    idTurno: number;


    constructor(
        pacienteNombre: string,
        pacienteDNI: number,
        horario: Date,
        profesional: string,
        numAtencion: number,
        idTurno: number
    ) {
        this.pacienteNombre = pacienteNombre;
        this.pacienteDNI = pacienteDNI;
        this.horario = horario;
        this.profesional = profesional;
        this.numAtencion = numAtencion;
        this.idTurno = idTurno;
    }

  }
