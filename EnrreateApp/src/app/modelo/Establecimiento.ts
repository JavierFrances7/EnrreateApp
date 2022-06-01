export class Establecimiento {
    uidEstablecimiento: string;
    nombreEstablecimiento:string;
    nombreGestor:string;
    correo:string;
    displayName:string;
    verificadoAdmin: boolean;
    latitud:number;
    longitud:number;
    ciudad:string;
    direccion:string;
    aforoMaximo:number;
	valoracionMedia:number;


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
        return establecimiento;
}
}


