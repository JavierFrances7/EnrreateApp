export class Establecimiento {
    uidEstablecimiento: string = null;
    nombreEstablecimiento: string = null;
    nombreGestor: string = null;
    correo: string = null;
    displayName: string = null;
    verificadoAdmin: boolean = null;
    latitud: number = null;
    longitud: number = null;
    ciudad: string = null;
    direccion: string = null;
    aforoMaximo: number = null;
    valoracionMedia: number = null;
    aforoActual: number = null;
    imagenPerfil: string = null;


    constructor() {
    }

    public static createFromJsonObject(jsonObject: any): Establecimiento {
        let establecimiento: Establecimiento = new Establecimiento();
        establecimiento.uidEstablecimiento = jsonObject['uidEstablecimiento'];
        establecimiento.nombreEstablecimiento = jsonObject['nombreEstablecimiento'];
        establecimiento.nombreGestor = jsonObject['nombreGestor'];
        establecimiento.correo = jsonObject['correo'];
        establecimiento.displayName = jsonObject['displayName'];
        establecimiento.verificadoAdmin = jsonObject['verificadoAdmin'];
        establecimiento.latitud = jsonObject['latitud'];
        establecimiento.longitud = jsonObject['longitud'];
        establecimiento.ciudad = jsonObject['ciudad'];
        establecimiento.direccion = jsonObject['direccion'];
        establecimiento.aforoMaximo = jsonObject['aforoMaximo'];
        establecimiento.valoracionMedia = jsonObject['valoracionMedia'];
        establecimiento.aforoActual = jsonObject['aforoActual'];
        establecimiento.imagenPerfil = jsonObject['imagenPerfil'];
        return establecimiento;
    }
}


