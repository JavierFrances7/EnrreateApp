
export class Administrador {
    uidAdministrador: string=null;
    nombre:string=null;
    correo:string=null;
    displayName:string=null;

    public static createFromJsonObject(jsonObject: any): Administrador {
        let administrador: Administrador = new Administrador();
        administrador.uidAdministrador = jsonObject['uidAdministrador'];
        administrador.nombre = jsonObject['nombre'];
        administrador.correo = jsonObject['correo'];              
        administrador.displayName = jsonObject['displayName'];
        return administrador;
}
}


