export class Usuario {
    uidUsuario: string;
    nombre:string;
    apellidos:string;
    nombreUsuario:string;
    correo:string;
    fechaNacimiento:Date;
    displayName:string;
    imagenPerfil:string;


    public static createFromJsonObject(jsonObject: any): Usuario {
        let usuario: Usuario = new Usuario();
        usuario.uidUsuario = jsonObject['uidUsuario'];
        usuario.nombre = jsonObject['nombre'];
        usuario.apellidos = jsonObject['apellidos'];
        usuario.nombreUsuario = jsonObject['nombreUsuario'];  
        usuario.correo = jsonObject['correo'];              
        usuario.fechaNacimiento = jsonObject['fechaNacimiento'];
        usuario.displayName = jsonObject['displayName'];
        usuario.imagenPerfil = jsonObject['imagenPerfil'];
        return usuario;
}
}


