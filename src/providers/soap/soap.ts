import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SoapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SoapProvider {
  url='http://oastest.politecnicointernacional.edu.co:7778/actualizaDatosPersonales/WSActualizaDatosPersonales?invoke=actualizaDatosPersonales&param0=';
  headersEnv= new Headers();

  constructor(public http: Http) {
    console.log('Hello SoapProvider Provider');
    this.headersEnv.append('Content-Type','text/XML');
  }

  consumirSOAP(body){
    console.log(body);
    let urlCompleta= this.url+body;    
    return new Promise((resolve, reject)=>{
    console.log('Bienvenido AL SOAP PROVIDER');
    this.http.get(urlCompleta, {headers:this.headersEnv})
    .subscribe(data=>{console.log(data);resolve(data.text())}, (error)=>{reject(error)})
    })
  } 

}
