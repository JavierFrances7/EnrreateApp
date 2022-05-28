import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/modelo/usuario';

 
@Injectable()
export class ApiServiceProvider {
 
    private URL = "http://127.0.0.1:8099/api";
 
    constructor(public http: HttpClient) {
    }
 

    getUsuarios(): Promise<Usuario[]> {
        let promise = new Promise<Usuario[]>((resolve, reject) => {
            this.http.get(this.URL +"/usuarios").toPromise()
                .then((data: any) => {
                    let usuarios = new Array<Usuario>();
                    data.forEach(usuarioJson => {
                        let usuario = Usuario.createFromJsonObject(usuarioJson);
                        usuarios.push(usuario);
                    });
                    resolve(usuarios);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getUsuarios
    
   
   
 /*
    insertarFactura(nuevaFactura: Factura): Promise<Factura> {
        let promise = new Promise<Factura>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete nuevaFactura.id; //cuando se hace un post no paso el id. El id es asignado por el servidor. Quito el atributo del objeto json
            let datos = JSON.stringify(nuevaFactura);
            this.http.post(this.URL + "/facturas/",datos,header).toPromise().then(
                    (data: any) => { // Success
                        let factura: Factura;
                        factura = Factura.createFromJsonObject(data);
                        resolve(factura);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarFactura
 */
}//end_class