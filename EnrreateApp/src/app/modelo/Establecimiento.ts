export class Establecimiento {
    uid: string;
    email:string;
    nombreEstablecimiento:string;
    diplayName:string;
    nombreGestor:string;
    emailVerificado:boolean;
    role:string;

    constructor() {
    }

    public static createFromJsonObject(jsonObject: any): Establecimiento {
        let establecimiento: Establecimiento = new Establecimiento();
        establecimiento.uid = jsonObject['uid'];
        establecimiento.email = jsonObject['email'];
        establecimiento.nombreEstablecimiento = jsonObject['nombreEstablecimiento'];
        establecimiento.diplayName = jsonObject['diplayName'];
        establecimiento.nombreGestor = jsonObject['nombreGestor'];
        establecimiento.emailVerificado = jsonObject['emailVerificado'];
        establecimiento.role = jsonObject['role'];
        return establecimiento;
}
}


