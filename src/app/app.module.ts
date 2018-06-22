import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule} from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule} from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MenuPageModule } from '../pages/menu/menu.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { MncattlePageModule } from '../pages/mncattle/mncattle.module';
import { MndamPageModule } from '../pages/mndam/mndam.module';
import { MncalfPageModule } from '../pages/mncalf/mncalf.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import { VerifyPageModule } from '../pages/verify/verify.module';
import { ReportPageModule } from '../pages/report/report.module';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MenuPageModule,
    DetailPageModule,
    RegisterPageModule,
    MncattlePageModule,
    MndamPageModule,
    MncalfPageModule,
    SettingPageModule,
    VerifyPageModule,
    ReportPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
