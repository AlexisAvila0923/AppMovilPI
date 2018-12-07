import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.0.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  /**Variable que almacena el documento del estudiante */
  identificacion:string;
  /**Arreglo para almacenar la respuesta del proveedor Rest al verificar el correo */
  arrayNumIden: any ;
  /**Arreglo para almacenar los datos tras el inicio de sesion */
  arrayDatos: any = [];
  /**Comodin para redirigir o negar acceso*/
  estadoAcceso : boolean;
  /**Variable para controlar la ventana de carga emergente*/
  loadingSesion;
  /**Variable para almacenar los datos del usuario de facebook */
  userFB: any = {};
  showUser: boolean = false;
  emailDemo='natalia_acosta1707@hotmail.com';
  // emailDemo='galindodavid5@gmail.com';
  // emailDemo='julisaperdomo24@gmail.com';


  /**Inicia los componentes de la pagina, dejando desabilitado el menú navegación*/
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthServiceProvider,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController, private menu: MenuController, 
              public splashScreen:SplashScreen, public facebook:Facebook, public storage:Storage, private platform:Platform) {
    this.splashLogin();    
    this.menu.enable(false);     
  }

  ionViewWillEnter(){
    let terminos = this.alertCtrl.create({
      title: 'Versión de pruebas PoliApp',
      message: 'Le damos la bienvenida a la versión 0.2 de pruebas de la aplicación móvil del Politécnico Internacional.'+      
      '<br> Recordamos que la información utilizada para ingresar a la aplicación no es almacenada en ningún sitio y es una servicio directamente brindado por Facebook.'+
      '<br>Lo invitamos a hacer parte de esta fase de pruebas y nos informe de cualquier novedad o falla que evidencie, ademas ' +
      'de cualquier sugerencia que crea conveniente.',
      buttons: ['Aceptar']
    });
    terminos.present();
  }

  ionViewDidEnter(){    
    this.splashScreen.hide();
    this.storage.remove('sesionUser');
    this.facebook.logout().catch(err=>console.log(err));
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
    this.loadingSesion.dismiss();
  }

  loginFacebook(){
    this.userFB={};
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true;
      this.userFB = data;
    })
    .catch(error =>{
      console.error( error );
    }).then(()=>{this.ingresar(this.emailDemo);}).catch(err=>console.log(err));
  }

  ingresar(userEmail){
    this.estadoAcceso=null;
    this.arrayNumIden=null;
    this.identificacion="";
    this.arrayDatos=[];
    this.iniciarLoadingPOPOVER();
    this.authProvider.verificarCorreo(userEmail).catch(err=>console.log(err))
    .then(result => {this.arrayNumIden=result['retorno']; console.log(this.arrayNumIden)}).catch(err=>{console.log(err+"Error de conexión")})
    .then(()=>{this.verificarContenidoJSON()});
  }

  private verificarContenidoJSON(){
      if(this.arrayNumIden){ 
        console.log(this.arrayNumIden.length);
        if(this.arrayNumIden.length>=1){
          console.log('Tengo info del rest')
          console.log(this.arrayNumIden);
          this.arrayNumIden.forEach(element => {
            this.identificacion=element.numeroIdentificacion;      
          });
          this.authProvider.obtenerDatos(this.identificacion)
          .then(result=>{this.arrayDatos=result['retorno'], console.log(this.arrayDatos)})
          .catch(err=>{console.log(err+"Error de conexión")})
          .then(()=>{this.verificarMatricula(this.arrayDatos)})
          .then(()=>{this.redirigir(this.userFB)});
        }else{
          console.log('Sin info del rest')
          console.log(this.arrayNumIden);
          this.estadoAcceso=false;
          this.redirigir(this.userFB);
        }
      }else{this.redirigir(this.userFB)}
  }

  verificarMatricula(arrayDatos){
    if(arrayDatos){
      if(arrayDatos.length>=1){
        arrayDatos.forEach(element => {
          let matriculado = element.matriculado
          matriculado= matriculado.toUpperCase();
          console.log('matricualado upperCase '+matriculado);
          if(matriculado=='SI'){
            this.estadoAcceso=true;
          }else{this.estadoAcceso=false;}
        });
      }else{this.estadoAcceso=false;}
    }else{this.estadoAcceso=null;}//Error de conexion con el servidor
  }

  /**Metodo que redirige como corresponda según @param boolean estadoAcceso */
  private redirigir(userFaceBook){
    console.log('Metood redirigir: EstadoAcceso es '+this.estadoAcceso);
    if(this.estadoAcceso){
      this.storage.set('sesionUser', this.arrayDatos);
      this.navCtrl.setRoot(HomePage, {key2:this.arrayDatos, key3:userFaceBook});
    }else{
      if(this.estadoAcceso==false){
      this.loadingSesion.dismiss();
      console.log('Acceso Denegado');
      let alerta = this.alertCtrl.create({
        title: 'Acceso Denegeado',
        subTitle: 'El correo electrónico ingresado no existe en el sistema académico o el alumno no está matriculado en el ciclo académico actual',
        buttons: ['Cerrar']
      });
      alerta.present();
      }else{
      this.loadingSesion.dismiss();
      console.log('Error en conexión con el servidor')
      let alertErrServidor = this.alertCtrl.create({
        title: 'Error de conexión con el servidor',
        subTitle: 'No se pudo realizar la conexión con el servidor, verifique la red',
        buttons: ['Cerrar']
      });
      alertErrServidor.present();
      }
    }    
  }
  /**Metodo que inicia la ventana Emergente de espera, mientras hace el proceso de verificación */
  private iniciarLoadingPOPOVER() {
    this.loadingSesion = this.loadingCtrl.create({
      content: `<img src="assets/imgs/loading-POLI1.gif"/>`,
      spinner: 'hide',
    });
    console.log('Inicio de Spinner');
    this.loadingSesion.present();
  }

  private splashLogin(){
    let loadingLogin = this.loadingCtrl.create({
      spinner: 'bubbles'
    },);
    loadingLogin.present();
    setTimeout(() => {
      loadingLogin.dismiss();
    }, 1500);
  }

  root(){
    this.ingresar(this.emailDemo);
  }
  
  cerrar(){
    this.platform.exitApp();
  }
}