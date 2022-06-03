import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/modelo/usuario';
import { Establecimiento } from 'src/app/modelo/Establecimiento';
import { FirebaseAuthService } from '../firebase-auth-service';


@Injectable()
export class ApiServiceProvider {

    private URL = "http://127.0.0.1:8099/api";

    constructor(public http: HttpClient, public fireAuth: FirebaseAuthService) {
    }
    /*------------------ MÉTODOS ADMIN ------------------*/
    
    /*------------------ FIN MÉTODOS ADMIN ------------------*/


    /*------------------ MÉTODOS USUARIOS ------------------*/


    //Método que obtiene los usuarios de la base de datos

    getUsuarios(): Promise<Usuario[]> {
        let promise = new Promise<Usuario[]>((resolve, reject) => {
            this.http.get(this.URL + "/usuarios")
                .toPromise()
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

    //Método que obtiene los uids de los usuarios de la base de datos

    getUidsUsuarios(): Promise<Usuario[]> {
        let promise = new Promise<Usuario[]>((resolve, reject) => {
            this.http.get(this.URL + "/usuarios/uids")
                .toPromise()
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
    }//end_getUidsUsuarios


    //Método que inserta los usuarios en la base de datos    

    async insertarUsuario(nuevoUsuario: Usuario): Promise<Usuario> {
        let promise = new Promise<Usuario>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevoUsuario);
            this.http.post(this.URL + "/usuario/", datos, header)
                .toPromise().then(
                    (data: any) => {
                        let usuario: Usuario;
                        usuario = Usuario.createFromJsonObject(data);
                        resolve(usuario);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarUsuario

    //Método que edita un usuario de la base de datos    

    modificarUsuario(nuevosDatosUsuario: Usuario): Promise<Usuario> {
        let promise = new Promise<Usuario>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevosDatosUsuario);
            this.http.put(this.URL + "/usuario/" + nuevosDatosUsuario.uidUsuario, datos, header)
                .toPromise().then(
                    (data: any) => { // Success
                        let usuario: Usuario;
                        usuario = Usuario.createFromJsonObject(data);
                        resolve(usuario);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_modificarUsuario

    //Método que elimina los usuarios de la base de datos    

    eliminarUsuario(usuario: Usuario): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL + "/usuario/" + usuario.uidUsuario)
                .toPromise().then(
                    (data: any) => {
                        resolve(true);
                    }
                )
                .catch((error: Error) => {
                    console.log(error.message);
                    reject(error.message);
                });
        });
        return promise;
    }//end_eliminarUsuario

    /* ------------------ FIN MÉTODOS USUARIOS ------------------*/


    /* ------------------ MÉTODOS ESTABLECIMIENTOS ------------------*/

    //Método que obtiene los establecimiento de la base de datos

    getEstablecimientos(): Promise<Establecimiento[]> {
        let promise = new Promise<Establecimiento[]>((resolve, reject) => {
            this.http.get(this.URL + "/establecimientos").toPromise()
                .then((data: any) => {
                    let establecimientos = new Array<Establecimiento>();
                    data.forEach(establecimientoJson => {
                        let establecimiento = Establecimiento.createFromJsonObject(establecimientoJson);
                        establecimientos.push(establecimiento);
                    });
                    resolve(establecimientos);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getEstablecimiento


    //Método que obtiene los uids de los establecimientos de la base de datos

    getUidsEstablecimientos(): Promise<Establecimiento[]> {
        let promise = new Promise<Establecimiento[]>((resolve, reject) => {
            this.http.get(this.URL + "/establecimientos/uids").toPromise()
                .then((data: any) => {
                    let establecimientos = new Array<Establecimiento>();
                    data.forEach(establecimientoJson => {
                        let establecimiento = Establecimiento.createFromJsonObject(establecimientoJson);
                        establecimientos.push(establecimiento);
                    });
                    resolve(establecimientos);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getUidsEstablecimientos


    //Método que inserta los establecimiento en la base de datos    

    insertarEstablecimiento(nuevaEstablecimiento: Establecimiento): Promise<Establecimiento> {
        let promise = new Promise<Establecimiento>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevaEstablecimiento);
            this.http.post(this.URL + "/establecimiento/", datos, header).toPromise().then(
                (data: any) => { // Success
                    let establecimiento: Establecimiento;
                    establecimiento = Establecimiento.createFromJsonObject(data);
                    resolve(establecimiento);
                }
            )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_insertarEstablecimiento

    //Método que edita los establecimiento de la base de datos    

    modificarEstablecimiento(nuevosDatosEstablecimiento: Establecimiento): Promise<Establecimiento> {
        let promise = new Promise<Establecimiento>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevosDatosEstablecimiento);
            this.http.put(this.URL + "/establecimiento/" + nuevosDatosEstablecimiento.uidEstablecimiento, datos, header)
                .toPromise().then(
                    (data: any) => { // Success
                        let establecimiento: Establecimiento;
                        establecimiento = Establecimiento.createFromJsonObject(data);
                        resolve(establecimiento);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_modificarEstablecimiento

    //Método que elimina los establecimiento de la base de datos    

    eliminarEstablecimiento(establecimiento: Establecimiento): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL + "/establecimiento/" + establecimiento.uidEstablecimiento).toPromise().then(
                (data: any) => {
                    resolve(true);
                }
            )
                .catch((error: Error) => {
                    console.log(error.message);
                    reject(error.message);
                });
        });
        return promise;
    }//eliminarEstablecimiento

    /* ------------------FIN MÉTODOS ESTABLECIMIENTOS ------------------*/

}//end_class