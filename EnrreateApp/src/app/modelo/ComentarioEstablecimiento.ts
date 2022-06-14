import { Establecimiento } from "./Establecimiento";
import { Usuario } from "./usuario";

export class ComentarioEstablecimiento {
    idComentario: string=null;
    fecha:number=null;
    comentario:string=null;
    establecimiento:Establecimiento;
    usuario:Usuario;


    public static createFromJsonObject(jsonObject: any): ComentarioEstablecimiento {
        let comentarioEstablecimiento: ComentarioEstablecimiento = new ComentarioEstablecimiento();
        let establecimiento: Establecimiento = new Establecimiento();
        let usuario: Usuario = new Usuario();

        comentarioEstablecimiento.idComentario = jsonObject['idComentario'];
        comentarioEstablecimiento.fecha = jsonObject['fecha'];
        comentarioEstablecimiento.comentario = jsonObject['comentario'];          
        comentarioEstablecimiento.establecimiento= Establecimiento.createFromJsonObject(jsonObject['uidEstablecimiento']);
        comentarioEstablecimiento.usuario= Usuario.createFromJsonObject(jsonObject['uidUsuario']);
        return comentarioEstablecimiento;
}
}


