export class Establecimiento {
    uid: string;
    nombreEstablecimiento:string;
    nombreGestor:string;
    correo:string;
    displayName:string;

    constructor() {
    }

    public static createFromJsonObject(jsonObject: any): Establecimiento {
        let establecimiento: Establecimiento = new Establecimiento();
        establecimiento.uid = jsonObject['uid'];
        establecimiento.nombreEstablecimiento = jsonObject['nombreEstablecimiento'];
        establecimiento.nombreGestor = jsonObject['nombreGestor'];
        establecimiento.correo = jsonObject['correo'];
        establecimiento.displayName = jsonObject['displayName'];
        return establecimiento;
}
}


