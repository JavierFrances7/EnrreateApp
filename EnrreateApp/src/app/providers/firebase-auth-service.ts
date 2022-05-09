import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class FirebaseAuthService {

    constructor(public angularFireAuth: AngularFireAuth) {
    }


    //Método para registrar nuevos usuarios en Firebase
    registerUser(email: string, password: string): Promise<any> {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    }

    //Método para iniciar sesión con email y contraseña previamente registrado en Firebase
    loginUser(email: string, password: string): Promise<any> {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }

    //Método para cerrar sesión del usuario logueado
    logoutUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.angularFireAuth.currentUser) {  //antes del logout se comprueba que hay usuario logueado
                this.angularFireAuth.signOut()
                    .then(() => {
                        console.log("LOG Out");
                        resolve(null);
                    }).catch((error) => {
                        reject();
                    });
            }
        })
    }

    //Método que retorna los detalles del usuario
    userDetails() {
        return this.angularFireAuth.user;
    }

}//end_class