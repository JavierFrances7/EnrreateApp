import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 
@Injectable()
export class ApiServiceProvider {
 
    private URL = "http://localhost:3000";
 
    constructor(public http: HttpClient) {
    }
 
 /*
    getHoteles(): Promise<Hotel[]> {
        let promise = new Promise<Hotel[]>((resolve, reject) => {
            this.http.get(this.URL + "/hoteles").toPromise()
                .then((data: any) => {
                    let hoteles = new Array<Hotel>();
                    data.forEach(hotelJson => {
                        let cliente = Hotel.createFromJsonObject(hotelJson);
                        hoteles.push(cliente);
                    });
                    resolve(hoteles);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getClientes
    
    */
   
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