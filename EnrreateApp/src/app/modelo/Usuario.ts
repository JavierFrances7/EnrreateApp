export class Usuario {
    uidUsuario: string=null;
    nombre:string=null;
    apellidos:string=null;
    nombreUsuario:string=null;
    correo:string=null;
    fechaNacimiento:Date=null;
    //Esta es para el login con google

    public static createFromJsonObject(jsonObject: any): Usuario {
        let usuario: Usuario = new Usuario();
        usuario.uidUsuario = jsonObject['uidUsuario'];
        usuario.nombre = jsonObject['nombre'];
        usuario.apellidos = jsonObject['apellidos'];
        usuario.nombreUsuario = jsonObject['nombreUsuario'];  
        usuario.correo = jsonObject['correo'];              
        usuario.fechaNacimiento = jsonObject['fechaNacimiento'];
        return usuario;
}
}


