import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
    
  }

  /**Metodo para volver a iniciar el slider ante una interaccion del usuario*/
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex==0||1||2||3||4){
      this.slides.startAutoplay();
    }
  }

}
