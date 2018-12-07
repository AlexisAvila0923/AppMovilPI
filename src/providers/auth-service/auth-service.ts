import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { RestProvider } from '../rest/rest'

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider { 

  constructor(public http: Http, public rest: RestProvider) {
    console.log('Hello AuthServiceProvider Provider');
  }
 /**Metodo que hace la conexion con el proveedor Rest de conexion*/
  public verificarCorreo(correo){
    console.log('Auth Service ... Conectando con Rest');
    console.log(correo);
     return this.rest.iniciarSesion(correo).catch(err=>{console.log(err.status+'Error de Conexion')});
  }

  public obtenerDatos(id){
    return this.rest.obtenerDatos(id).catch(err=>{console.log(err.status)})  
  }
  

}
