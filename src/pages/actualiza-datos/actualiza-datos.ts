import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { SoapProvider } from '../../providers/soap/soap';

@Component({
  selector: 'page-actualiza-datos',
  templateUrl: 'actualiza-datos.html',
})
export class ActualizaDatosPage {
  formNumbersVisibility:boolean=false;
  formCivilStatusVisibility:boolean=false;
  formEmailVisibility:boolean=false;
  listaEstadoCivil=[
    {value:1, estado:'CASADO'},
    {value:2, estado:'SOLTERO'},
    {value:3, estado:'SEPARADO'},
    {value:4, estado:'UNION LIBRE'},
    {value:5, estado:'VIUDO'},
    {value:6, estado:'DIVORCIADO'},
    {value:7, estado:'NO DEFINIDO'},
    {value:8, estado:'RELIGIOSO(A)'},
    {value:9, estado:'MADRE SOLTERA'}
  ]
  selectOptions={
    title: 'Estado Civil',
    subTitle: 'Seleccione una opción',
    mode: 'md',
  }
  /**Variable que almacena la información que el usuario registra en cualquiera de los formularios*/
  nuevaInfo;
  campo=this.navParams.get('key1');
  id=this.navParams.get('key2');

  documento:string = '<DOCUMENTO>'+this.id+'</DOCUMENTO>';
  celular: string = '<CELULAR></CELULAR>';
  telefono: string = '<TELEFONO></TELEFONO>';
  correo: string='<CORREO></CORREO>';
  estadoCivil: string = '<ESTADO_CIVIL></ESTADO_CIVIL>';
  body: string;
  parserResponse;
  bodyResponse;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public soap: SoapProvider, public alertCtrl: AlertController, public toastCtrl:ToastController) {
    this.activeForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizaDatosPage');
    console.log(this.listaEstadoCivil);
  }
  activeForm(){
    console.log(this.campo);
    if(this.campo=='estado civil'){this.formCivilStatusVisibility=true;console.log('if estadoCivil')}
    if(this.campo=='celular'|| this.campo=='telefono'){this.formNumbersVisibility=true;console.log('if celular y telefono')}
    if(this.campo=='email'){this.formEmailVisibility=true}
  }

  enviarCodigo(){
    this.crearBody()
    .then(()=>this.llamarProveedor())
  }

  crearBody(){
    console.log('Creando el Body');
    return new Promise((resolve)=>{
    switch (this.campo) {
      case 'celular': this.celular='<CELULAR>'+this.nuevaInfo+'</CELULAR>'
        break;
      case 'telefono': this.telefono='<TELEFONO>'+this.nuevaInfo+'</TELEFONO>'       
        break;
      case 'email': this.correo='<CORREO>'+this.nuevaInfo+'</CORREO>'
        break;
      case 'estado civil': this.estadoCivil='<ESTADO_CIVIL>'+this.nuevaInfo+'</ESTADO_CIVIL>'
        break;          
      default:
        break;
    }
    this.body= 
          '<DATOS_PERSONALES><INFORMACION>'+
            this.documento+'<DIRECCION></DIRECCION>'+this.celular+
            this.telefono+'<FECHA_NACIMIENTO></FECHA_NACIMIENTO>'+this.correo+
            this.estadoCivil+'<GENERO></GENERO>'+
          '</INFORMACION></DATOS_PERSONALES>';resolve(this.body);
    });   
  }

  llamarProveedor(){
    console.log('Llamando al proveedor SOAP');
    this.soap.consumirSOAP(this.body).catch(err=>console.log(err))
    .then((data:string)=>{
      this.parserResponse = new DOMParser().parseFromString(data, "text/xml");
      this.bodyResponse = this.parserResponse.getElementsByTagName("return")[0].innerHTML})
    .catch((err)=>{console.log(err)})
    .then(()=>{console.log(this.bodyResponse);this.verificarResponseSoap()})
  }

  verificarResponseSoap(){
    return new Promise((resolve)=>{
      if(!(this.bodyResponse==null||this.bodyResponse==undefined)){
        if(this.bodyResponse.indexOf('0')>-1){console.log('CAMBIO CORRECTO EN LA BASE DE DATOS');//Verificar que el return contenga el 0        
          if(this.campo=='email'){
            this.createAlertCambioEmail();
            this.navCtrl.goToRoot(null);
          }else{
            this.createAlertOk();
            this.navCtrl.pop();
          }
        }else{console.log('respuesta incorrecta del servidor'), this.createAlertFalse();}
      }else{console.log('Response Undefined or Null'), this.createAlertFalse();}
    })
  }

  createAlertOk(){
    let toast = this.toastCtrl.create({
      message: 'Información actualizada correctamente',
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

  createAlertCambioEmail(){
    let alerta = this.alertCtrl.create({
      title: 'Actualización de datos',
      subTitle: 'Su cambio de correo electrónico fue generado correctamente, ahora puede iniciar sesión con este.',
      buttons: ['Cerrar']
    })
    alerta.present();    
  }

  createAlertFalse(){
    let alerta = this.alertCtrl.create({
      title: 'Actualización de datos',
      subTitle: 'No se pudo realizar la actualización de información',
      buttons: ['Cerrar']
    })
    alerta.present();
  }

}
