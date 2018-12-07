import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DiaemergentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-diaemergente',
  templateUrl: 'diaemergente.html',
})
export class DiaemergentePage {

  public dia = this.navParams.get('key1');
  public horarioDia= this.navParams.get('key3')
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaemergentePage');
    console.log(this.dia);
    console.log(this.horarioDia);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
