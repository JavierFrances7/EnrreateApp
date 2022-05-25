export class Usuario {
    uid: string;
    nombre:string;
    apellidos:string;
    nombreUsuario:string;
    correo:string;
    fechaNacimiento:Date;
    //Esta es para el login con google
    displayName:string;

    constructor() {
    }

    public static createFromJsonObject(jsonObject: any): Usuario {
        let usuario: Usuario = new Usuario();
        usuario.uid = jsonObject['uid'];
        usuario.nombre = jsonObject['nombre'];
        usuario.apellidos = jsonObject['apellidos'];
        usuario.correo = jsonObject['correo'];        
        usuario.fechaNacimiento = jsonObject['fechaNacimiento'];
        usuario.displayName = jsonObject['displayName'];
        return usuario;
}
}


