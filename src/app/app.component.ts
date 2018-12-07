import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';


import {HomePage} from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { LoginPage } from '../pages/login/login';
import { HorarioPage } from '../pages/horario/horario';
import { NotasPage } from '../pages/notas/notas';
import { DatosPage } from '../pages/datos/datos';
import { NotificacionPage } from '../pages/notificacion/notificacion';
import { EvaluacionPage } from '../pages/evaluacion/evaluacion';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  inicioInactividad;
  inactivo:boolean=false;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              public alertCtrl : AlertController, public app: App, public backgroundMode: BackgroundMode) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: InicioPage, icon: 'home'},
      { title: 'Horario', component: HorarioPage, icon: 'calendar'},
      { title: 'Notas', component: NotasPage, icon: 'school'},
      { title: 'Actualización Datos', component: DatosPage, icon: 'body'},
      { title: 'Notificaciones', component: NotificacionPage, icon: 'notifications'},
      { title: 'Evaluación Docente', component: EvaluacionPage, icon: 'bookmarks'},
      { title: 'Cerrar sesión', component: LoginPage, icon: 'power'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.backgroundMode.enable();
      this.backgroundMode.overrideBackButton();
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        if(activeView.name === "LoginPage") {
          if (nav.canGoBack()){ nav.pop(); }
        }
      });
      // this.backgroundMode.on('activate').subscribe(()=>{this.capturarInicioInactividad()});
      // this.backgroundMode.on('deactivate').subscribe(()=>{this.verificarInactividad()});
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  capturarInicioInactividad(){
    let nav = this.app.getActiveNavs()[0];
    let activeView = nav.getActive();
    if(activeView.name !== "LoginPage") {
      this.inicioInactividad=Date.now();
      this.inactivo=true; 
    }
  }

  verificarInactividad(){
    if(this.inactivo){
      let finInactividad=Date.now();
      let totalInactividad=finInactividad-this.inicioInactividad;
      if(totalInactividad>600000){//Diez minutos de Inactividad 
        this.createAlert(totalInactividad);
        this.inactivo=false;
        totalInactividad=0;
        this.nav.setRoot(LoginPage);
      }
    }
  }

  createAlert(time){
    let alertForegroundY = this.alertCtrl.create({
      title: 'Desconexión por Inactividad',
      subTitle: 'La sesion a expirado, inicia sesión nuevamente.',
      buttons: ['Cerrar']
    })
    alertForegroundY.present();
  }
}
