import { Establecimiento } from "./Establecimiento";

export class Evento {
    idEvento: string = null;
    nombre: string = null;
    aforoMaximo: number = null;
    fechaInicio: Date = null;
    fechaFin: Date = null;
    edadMinima: number = null;
    tipoMusica: string = null;
    establecimiento: Establecimiento;

    public static createFromJsonObject(jsonObject: any): Evento {
        let evento: Evento = new Evento();
        let establecimiento: Establecimiento = new Establecimiento();

        evento.idEvento = jsonObject['idEvento'];
        evento.nombre = jsonObject['nombre'];
        evento.aforoMaximo = jsonObject['aforoMaximo'];
        evento.fechaInicio = jsonObject['fechaInicio'];
        evento.fechaFin = jsonObject['fechaFin'];
        evento.edadMinima = jsonObject['edadMinima'];
        evento.tipoMusica = jsonObject['tipoMusica'];
        evento.establecimiento = Establecimiento.createFromJsonObject(jsonObject['uidEstablecimiento']);
        return evento;
    }
}


