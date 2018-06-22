import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { MncattlePage } from '../pages/mncattle/mncattle';
import { MndamPage } from '../pages/mndam/mndam';
import { MncalfPage } from '../pages/mncalf/mncalf';
import { SettingPage } from '../pages/setting/setting';
import { VerifyPage } from '../pages/verify/verify';
import { ReportPage } from '../pages/report/report';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  alert;
  log=0;
  pages: Array<{icon: string,title: string, component: any}>;
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      platform.registerBackButtonAction(() => {
        if(this.nav.canGoBack()){
          this.nav.pop();
        }else{
          if(this.alert){
            this.alert.dismiss();
            this.alert =null;
          }else{
            this.showAlert();
           }
        }
      });
    });
    this.pages = [
      { icon: 'ios-arrow-forward', title: 'จัดการข้อมูลโค', component: MncattlePage },
      { icon: 'ios-arrow-forward', title: 'บันทึกการจัดการแม่พันธุ์', component: MndamPage },
      { icon: 'ios-arrow-forward', title: 'บันทึกการจัดการลูกโค', component: MncalfPage },
      { icon: 'md-settings', title: 'ตั้งค่าและแจ้งเตือน', component: SettingPage },
      { icon: 'md-search', title: 'ตรวจสอบข้อมูลโค', component: VerifyPage },
      { icon: 'md-print', title: 'ออกรายงานข้อมูลโค', component: ReportPage },
      { icon: 'md-folder-open', title: 'ผู้ใช้งาน', component: DetailPage },
      { icon: 'ios-log-out-outline', title: 'ออกจากระบบ', component: HomePage }
    ];

  }
  openPage(page) {
    if(page.component==HomePage)
    {
      this.nav.setRoot(page.component,{logout: this.log=1});
    }
    else{
      this.nav.push(page.component);
    }
  }
  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
         ]
        });
        this.alert.present();
  }
}

