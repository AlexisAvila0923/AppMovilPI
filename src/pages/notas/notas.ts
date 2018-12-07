import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {
  user;
  identificacion:string;
  notas=[];
  evaluacionDocente=[];
  /**Arreglo para almacenar el o los programas del estudiante/ */
  facultades=[];
  selectedFac:string;
  evaluo:boolean;
  selectOptions;
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, 
              private storage:Storage, public loadingCtrl: LoadingController) {
    
    // this.user=[{'numeroIdentificacion':'1014290284', 'datosPlanSede':[{'nombrePrograma':'GASTRONOMIA', 'codigoPlan':'064T', 'nombreSede':'SEDE CALLE 80', 'idCiclo':'1'},{'nombrePrograma':'AUXILIAR ADMINISTRATIVO','codigoPlan':'32-1', 'nombreSede':'SEDE CALLE 80', 'idCiclo':'2'}]}];
    this.selectOptions={
      title: 'Programas',
      subTitle: 'Seleccione una opción',
      mode: 'md',
    }
  }

  ionViewWillEnter(){
    this.storage.get('sesionUser')
    .then((res)=>{this.user=res})
    .then(()=>{this.cargarFacultades();})
    .then(()=>{this.iniciarBusquedaNotas()});
  }

  ionViewDidLoad(){}

  iniciarBusquedaNotas(){
    this.iniciarLoadingPOPOVER();
    console.log(this.identificacion);
    console.log(this.selectedFac);
    this.rest.obtenerNotas(this.identificacion,this.selectedFac)
    .then((obj)=>{this.notas=obj['retorno'], console.log(obj)})
    .catch(err=>{console.log(err)})
    .then(()=>{this.rest.obtenerEvaluacionDocente(this.identificacion,this.selectedFac)
      .then((obj)=>{this.evaluacionDocente=obj['retorno'], console.log(obj)})
      .catch(err=>{console.log(err)})
      .then(()=>this.verificarEvaluacionDocente(), this.loading.dismiss())
    })
    
  }

  cargarFacultades(){
    this.user.forEach(element => {
      this.identificacion=element.numeroIdentificacion;
      if(element.datosPlanSede){
      element.datosPlanSede.forEach(element2 => {
        this.facultades.push(element2);
        console.log(this.facultades);
        this.selectedFac=element2.codigoPlan;
        console.log(this.selectedFac);
      });
      }
    })
  }

  verificarEvaluacionDocente(){
    console.log('VerificandoEvaluacionDOcente')
    this.evaluo=true;
    if(this.evaluacionDocente.length>0){
      this.evaluacionDocente.forEach(element => {
        if(element.avaluo=='N'){
          this.evaluo=false;
          console.log(this.evaluo);
        }    
      });
    }
  }

  iniciarLoadingPOPOVER(){
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loading-POLI1.gif" />`
    });
    this.loading.present();
  }
}
