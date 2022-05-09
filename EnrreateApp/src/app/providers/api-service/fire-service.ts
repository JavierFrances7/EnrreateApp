import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable()
export class FireServiceProvider{

    constructor(private angularFirestore: AngularFirestore,
        private afStorage: AngularFireStorage) {
    }


    /*
    este método devuelve un objeto 'Promise'. Esto es un elemento asíncrono que puede finalizar de dos formas: correctamente, en cuyo caso sale con resolve, o bien de forma incorrecta, acabando en ese caso con reject.
    El método llama al método get de alumno. .......sR, pasándole como parámetro la url que devuelve la colección alumnos de la Api. Lo que devuelve este método lo convertimos a Promise, para luego evaluar su resultado mediante then y catch.
    Si el acceso a la Api ha ido bien el código que se ejecuta es el ubicado en la cláusula then. Si ha ido mal se ejecuta el código ubicado en la cláusula catch. 
    Si todo ha ido bien convertimos el array de objetos Json que nos llega a un array de objetos alumnos, y lo devolvemos con resolve.
    Si el acceso ha ido mal devolvemos el mensaje de error que no llega mediante reject.
    */
/*
    getModelos(): Promise<Modelo[]> {
        let promise = new Promise<Modelo[]>((resolve, reject) => {
            const modelosRef = this.angularFirestore.collection('modelos');
            const snapshot = modelosRef.get().toPromise()
                .then((data: any) => {
                    let modelos = new Array<Modelo>();
                    data.forEach(element => {
                        let modeloJson = element.data();
                        let modelo = Modelo.createFromJsonObject(modeloJson);
                        modelos.push(modelo);
                    });
                    resolve(modelos);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }

*/

    /*
    este método manda una solicitud de borrado a la Api del usuario con un id determinado.
    Si el borrado va bien se sale son resolve devolviendo true.
    Si el borrado va mal se sale con reject, devolviendo el mensaje de error que nos llega
    */

   


/*
    insertarModelo(datosNuevoReserva: Reserva): Promise<Reserva> {
        let promise = new Promise<Reserva>((resolve, reject) => {
            datosNuevoReserva.id = this.angularFirestore.collection("reserva").ref.doc().id;
            this.angularFirestore.collection("reserva").doc(datosNuevoReserva.id).set(JSON.parse(JSON.stringify(datosNuevoReserva)))
                .then(() => {
                    resolve(datosNuevoReserva);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarAlumn

      getModelo(): any {
        return (this.angularFirestore.collection('modelos').snapshotChanges());
    }*/

}//end_class