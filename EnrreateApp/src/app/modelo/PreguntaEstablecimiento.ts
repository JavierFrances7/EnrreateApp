import { Establecimiento } from "./Establecimiento";
import { Usuario } from "./usuario";

export class PreguntaEstablecimiento {
    idPregunta: number=null;
    fecha:number=null;
    pregunta:string=null;
    respuesta:string=null;
    establecimiento:Establecimiento;
    usuario:Usuario;


    public static createFromJsonObject(jsonObject: any): PreguntaEstablecimiento {
        let preguntaEstablecimiento: PreguntaEstablecimiento = new PreguntaEstablecimiento();
        let establecimiento: Establecimiento = new Establecimiento();
        let usuario: Usuario = new Usuario();

        preguntaEstablecimiento.idPregunta = jsonObject['idPregunta'];
        preguntaEstablecimiento.fecha = jsonObject['fecha'];
        preguntaEstablecimiento.pregunta = jsonObject['pregunta'];    
        preguntaEstablecimiento.respuesta = jsonObject['respuesta'];          
        preguntaEstablecimiento.establecimiento= Establecimiento.createFromJsonObject(jsonObject['uidEstablecimiento']);
        preguntaEstablecimiento.usuario= Usuario.createFromJsonObject(jsonObject['uidUsuario']);
        return preguntaEstablecimiento;
}
}


