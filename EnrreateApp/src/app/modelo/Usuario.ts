export class Usuario {
    uid: string;
    email:string;
    //Esta es para el login con google
    diplayName:string;
    emailVerificado:boolean;
    role:string;

    constructor() {
    }

    public static createFromJsonObject(jsonObject: any): Usuario {
        let usuario: Usuario = new Usuario();
        usuario.uid = jsonObject['uid'];
        usuario.email = jsonObject['email'];
        usuario.diplayName = jsonObject['diplayName'];
        usuario.emailVerificado = jsonObject['emailVerificado'];
        return usuario;
}
}


