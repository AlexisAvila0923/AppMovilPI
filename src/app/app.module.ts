import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { BackgroundMode } from '@ionic-native/background-mode';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { LoginPage } from '../pages/login/login';
import { HorarioPage } from '../pages/horario/horario';
import { NotasPage } from '../pages/notas/notas'
import { DatosPage } from '../pages/datos/datos';
import { ActualizaDatosPage } from '../pages/actualiza-datos/actualiza-datos'
import { NotificacionPage } from '../pages/notificacion/notificacion';
import { DiaemergentePage } from '../pages/diaemergente/diaemergente';
import { EvaluacionPage } from '../pages/evaluacion/evaluacion';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SoapProvider } from '../providers/soap/soap';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InicioPage,
    LoginPage,
    HorarioPage,
    NotasPage,
    DatosPage,
    ActualizaDatosPage,
    NotificacionPage,
    DiaemergentePage,
    EvaluacionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InicioPage,
    LoginPage,
    HorarioPage,
    NotasPage,
    DatosPage,
    ActualizaDatosPage,
    NotificacionPage,
    DiaemergentePage,
    EvaluacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthServiceProvider,
    SoapProvider,
    Facebook,
    BackgroundMode
  ]
})
export class AppModule {}
