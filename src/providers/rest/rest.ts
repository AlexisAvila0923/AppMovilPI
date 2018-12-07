import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // diegoedtava@hotmail.com
  //1097639547 ---- diegoedtava@hotmail.com //Usuario de prueba del puerto 7070
  //1073160571 Estudiante Nuevo Software
  //1014301064 Estudiante Antiguo
  //1018503455 Estudiante Antiguo
  //1073170192 Estudiante con dos programas - SOLO VIO UNO
  //1014290284 Estudiante con dos programas - VIGENTE // natalia_acosta1707@hotmail.com
  /**Variable que almacena el documento del estudiante que esta en sesión, inicializado posteriormete*/
  public sesionId;

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  iniciarSesion(correo){
    this.sesionId=null;
    return new Promise((resolve,reject)=>{
      this.http.get('http://190.60.254.165:8080/IntegracionPolinter/webresources/AutenticacionCorreo/?usuario=App&pw=ac863f346e618f9a959b5c95d5d28941&correo='+correo)
      .map(res=>res.json()) 
      .subscribe((data:any=[])=>{
        resolve(data)},(err)=>{reject(err)}
      );
    })
  }

  /** Este metodo hace el consumo del WS segun el tipo de estudiante.
  @param id El documento del estudiante a consultar
  */
  obtenerDatos(id){
    this.sesionId=id;
    return new Promise((resolve,reject)=>{
      this.http.get('http://190.60.254.165:8080/IntegracionPolinter/webresources/DatosBasicosApp/?usuario=App&pw=ac863f346e618f9a959b5c95d5d28941&dni='+this.sesionId)
      .map(res=>res.json())
      .subscribe((data:any=[])=>{
        resolve(data)}, (err)=>{reject(err)}
      );
    })
  }

  obtenerHorario(id){
    console.log('Esta obteniendo el horario del doc #:'+id);
    return new Promise((resolve,reject)=>{this.http.get('http://190.60.254.165:8080/IntegracionPolinter/webresources/Horario/?usuario=App&pw=ac863f346e618f9a959b5c95d5d28941&dni='+id)
    .map(res=>res.json())
    .subscribe((data: any = []) => {
      resolve(data)},(err)=>{reject(err), console.log('Rest: Error de conexión')}
    );
    })
  }

  obtenerEvaluacionDocente(id, codPlan){
    console.log('Evaluacion Docente del doc#:'+id);
    console.log('del plan '+ codPlan);
    return new Promise((resolve,reject)=>{this.http.get('http://190.60.254.165:8080/IntegracionPolinter/webresources/EvaluacionDocenteApp/?usuario=Zoom&pw=8000236fb71bd13371011bded72cc019&dni='+id+'&plan='+codPlan)
    .map(res=>res.json())
    .subscribe((data:any=[])=>{
      resolve(data)}, (err)=>{reject(err)}
    );
    })
  }

  obtenerNotas(id, codPlan){
    console.log('Esta obteniendo las notas del dec #:' + id);
    console.log('del plan '+ codPlan);
    return new Promise((resolve, reject)=>{this.http.get('http://190.60.254.165:8080/IntegracionPolinter/webresources/CalificacionEstudianteApp/?usuario=Zoom&pw=8000236fb71bd13371011bded72cc019&dni='+id+'&plan='+codPlan)
    .map(res=>res.json())
    .subscribe((data:any =[])=>{
      resolve(data)},(err)=>{reject(err), console.log('Rest: Error en conexión')}
    );
    })
  }
  /*Este Metodo es Observable y por ende asincronico, no es util debido a que nesesitamos la respuesta del servicio antes de continuar.
  obternerDatos(id) {
    console.log('El Id que me mandan es ' + id); 
    return this.http.get('http://172.16.10.20:8080/IntegracionPolinter/webresources/ReciboMatriculadosNuevos/?anio=2018&trimestre=1T&usuario=App&pw=ac863f346e618f9a959b5c95d5d28941&dni='+id)
    .do((res :Response) => console.log(res)).map(res=>res.json());
  }*/

  //return this.http.get('https://jsonplaceholder.typicode.com/users');
  //'/urlRest'
  //WS Estudiantes Antiguos
  //http://172.16.10.20:8080/IntegracionPolinter/webresources/ReciboMatriculadosAntiguos/?anio=2018&trimestre=2T&usuario=App&pw=ac863f346e618f9a959b5c95d5d28941&dni=1014301064
  //http://190.60.254.165:8080/IntegracionPolinter/webresources/ReciboMatriculadosAntiguos/?anio=2018&trimestre=2T&usuario=App&pw=ac863f346e618f9a959b5c95d5d28941&dni=
  //WS Estudiantes Nuevos
  //http://172.16.10.20:8080/IntegracionPolinter/webresources/ReciboMatriculadosNuevos/?anio=2018&trimestre=2T&usuario=Poli&pw=f6711662001fa08d2fd2c03a2a9e4a4e&dni=1073160571
  //http://190.60.254.165:8080/IntegracionPolinter/webresources/ReciboMatriculadosNuevos/?anio=2018&trimestre=2T&usuario=Poli&pw=f6711662001fa08d2fd2c03a2a9e4a4e&dni=
}