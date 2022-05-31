export class Establecimiento {
    uidEstablecimiento: string;
    nombreEstablecimiento:string;
    nombreGestor:string;
    correo:string;
    displayName:string;
    verificadoAdmin: boolean;

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
        return establecimiento;
}
}


