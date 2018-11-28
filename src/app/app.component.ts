import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
// import { DetailPage } from '../pages/detail/detail';
import { MncattlePage } from '../pages/mncattle/mncattle';
import { MndamPage } from '../pages/mndam/mndam';
import { MncalfPage } from '../pages/mncalf/mncalf';
import { SettingPage } from '../pages/setting/setting';
import { VerifyPage } from '../pages/verify/verify';

import { ProfilePage } from '../pages/profile/profile';
import { EditdatauserPage } from '../pages/editdatauser/editdatauser';
import { GlobalProvider } from '../providers/global/global';
import { AuthProvider } from '../providers/auth/auth';
import { MenuPage } from '../pages/menu/menu';

import firebase from 'firebase';
import { SelectnurturePage } from '../pages/selectnurture/selectnurture';
import { NodeapiProvider } from '../providers/nodeapi/nodeapi';

import { SearchFarmPage } from '../pages/search-farm/search-farm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage;
  alert;
  data;
  fname;
  lname;
  user;
  myPhotoURL;


  pages: Array<{icon: string,title: string, component: any}>;
  constructor(private platform: Platform
    , statusBar: StatusBar, splashScreen: SplashScreen,public global:GlobalProvider,
     private alertCtrl: AlertController,private auth: AuthProvider,
     private loadingCtrl:LoadingController
     ,private api:NodeapiProvider
     ) {
      platform.ready().then(() => {
        if (splashScreen) {
          setTimeout(() => {
            splashScreen.hide();
          }, 100);
         }
         this.auth.isAuthenticated().subscribe((data)=>{
          if(data==true){

            console.log(this.auth.getEmail());
            this.api.getUserByEmail(this.auth.getEmail()).subscribe(data=>{
              var value = Object.keys(data).map(key=>data[key]);
                  if(value[0].privilege =='เจ้าของฟาร์ม'){
                    this.pages = [
                      { icon: 'ios-arrow-forward', title: 'จัดการใบพันธุ์ประวัติโค', component: MncattlePage },
                      { icon: 'ios-arrow-forward', title: 'บันทึกระบบสืบพันธุ์แม่โค', component: MndamPage },
                      { icon: 'ios-arrow-forward', title: 'บันทึกการจัดการลูกโค', component: MncalfPage },
                      { icon: 'md-settings', title: 'บันทึกการรักษา', component: SelectnurturePage },
                      { icon: 'md-search', title: 'เรียกดูและแก้ไขข้อมูลโค/ออกรายงาน', component: VerifyPage },

                       { icon: 'md-settings', title: 'ตั้งค่าและแจ้งเตือน', component: SettingPage },
                      { icon: 'md-folder-open', title: 'ตั้งค่าแบรนด์', component: ProfilePage },
                      { icon: 'md-create', title: 'แก้ไขข้อมูลส่วนตัว', component: EditdatauserPage },
                      { icon: 'ios-log-out-outline', title: 'ออกจากระบบ', component: HomePage }
                    ];
                    this.rootPage = MenuPage;
                    this.user = value[0].user;
                    this.fname = value[0].fname;
                    this.lname = value[0].lname;
                    firebase.storage().ref().child('Photos/'+value[0].user+'/Logo').getDownloadURL().then((url)=>{
                      this.myPhotoURL=url;
                    })
                  }
                  else if(value[0].privilege =='สัตวแพทย์'||value[0].privilege =='สัตวบาล'){
                    this.pages = [
                      { icon: 'ios-arrow-forward', title: 'บันทึกระบบสืบพันธุ์แม่โค', component: MndamPage },
                      { icon: 'ios-arrow-forward', title: 'บันทึกการจัดการลูกโค', component: MncalfPage },
                      { icon: 'md-settings', title: 'บันทึกการรักษา', component: SelectnurturePage },
                      { icon: 'md-search', title: 'เรียกดูและแก้ไขข้อมูลโค/ออกรายงาน', component: VerifyPage },

                      { icon: 'md-create', title: 'แก้ไขข้อมูลส่วนตัว', component: EditdatauserPage },
                      { icon: 'ios-log-out-outline', title: 'ออกจากระบบ', component: HomePage }
                    ];
                    this.rootPage = MenuPage;
                    this.user = value[0].adminfarm;
                    this.fname = value[0].fname;
                    this.lname = value[0].lname;
                    firebase.storage().ref().child('Photos/'+value[0].adminfarm+'/Logo').getDownloadURL().then((url)=>{
                      this.myPhotoURL=url;
                    })
                  }
                  else if(value[0].privilege =='พนักงานฟาร์ม'){
                    this.pages = [
                      { icon: 'md-search', title: 'เรียกดูและแก้ไขข้อมูลโค/ออกรายงาน', component: VerifyPage },

                      { icon: 'md-create', title: 'แก้ไขข้อมูลส่วนตัว', component: EditdatauserPage },
                      { icon: 'ios-log-out-outline', title: 'ออกจากระบบ', component: HomePage }
                    ];
                    this.rootPage = MenuPage;
                    this.user = value[0].adminfarm;
                    this.fname = value[0].fname;
                    this.lname = value[0].lname;
                    firebase.storage().ref().child('Photos/'+value[0].adminfarm+'/Logo').getDownloadURL().then((url)=>{
                      this.myPhotoURL=url;
                    })

                  }
                  else{
                    this.pages = [
                      { icon: 'md-create', title: 'แก้ไขข้อมูลส่วนตัว', component: EditdatauserPage },
                      { icon: 'ios-log-out-outline', title: 'ออกจากระบบ', component: HomePage }
                    ];
                    this.fname = value[0].fname;
                    this.lname = value[0].lname;
                    this.user = value[0].user;
                    this.myPhotoURL = 'assets/menu1/3.png'
                    this.rootPage = SearchFarmPage;

                  }

            })

          }
          else{
            this.rootPage = HomePage;
          }
        });



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


  }

  async openPage(page) {
    console.log('user: '+this.user)
    if(page.component==HomePage)
    {
      this.presentLoading();
      await this.sleep(1000);
      this.nav.setRoot(HomePage);
      this.auth.logout();


    }
    else{
      this.nav.push(page.component,{user:this.user});
    }
  }
  showAlert() {
    this.alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'ปิดโปรแกรม',
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
  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "ออกจากระบบ...",
      duration: 1000
    });
    loader.present();
  }
}

