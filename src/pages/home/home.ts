import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**Arreglo para recibir los datos del estudiante */
  public infoEst = this.navParams.get('key2');
  public userFB = this.navParams.get('key3');
  showUserFB: boolean;


  /**Iniciar los componentes y habilita es el menu de navegación para la App*/
  constructor(public navCtrl: NavController, public navParams:NavParams,private menu: MenuController, public splashScreen:SplashScreen) {
    this.menu.enable(true);
    console.log('Welcome to Home');
    console.log(this.infoEst);
  }

  ionViewWillEnter(){
    if(this.userFB.length>0){this.showUserFB=true;}
    
  }

}
