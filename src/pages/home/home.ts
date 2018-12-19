import { Component } from '@angular/core';
import { NavController,AlertController, NavParams, MenuController,LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../../providers/global/global';
import { Network } from '@ionic-native/network';
import swal from 'sweetalert';
import { AuthProvider } from '../../providers/auth/auth';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  check=0;
  item : Observable<any[]>;
  checkuser=[];
  checkpass=[];
  count_login=[];
  checkemail=[];
  checkkey=[];

  public user$;
  constructor(public NavCtrl: NavController,
     public navParams: NavParams,public AlertCtrl: AlertController
     ,public menu:MenuController,public loadingCtrl: LoadingController
     ,public global:GlobalProvider,private network:Network,public toast:ToastController,
     private auth:AuthProvider,
     private api:NodeapiProvider,private splashScreen: SplashScreen){
      this.user$ = this.auth.user;
       console.log('Status: '+this.network.type);
      this.network.onDisconnect().subscribe(()=>{
        swal(
          "ไม่สามารถเชื่อมต่อได้","กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตและลองใหม่อีกครั้ง","info"
        ).then(value => {
          this.splashScreen.show();
          window.location.reload();
        })
      });


    this.check=0;
    this.menu=menu;
    this.menu.enable(false,'myMenu');

    this.api.getUserAll().subscribe(data=>{
      if(data!=null){
        var values = Object.keys(data).map(key=>data[key]);
        values.forEach(element=>{
          this.checkuser.push(element.user);
          this.checkpass.push(element.pass);
          this.checkemail.push(element.email);
          this.count_login.push(element.count_login);
        })
        for(let i =0 ;i<values.length;i++){
          this.checkkey.push(Object.keys(data)[i]);
        }
      }

    })
  }


  login(){
      let c=0;
      const prompt1 = this.AlertCtrl.create({
        title: 'ลงชื่อเข้าใช้',
        inputs: [
          {
            name: 'user',
            placeholder: 'ชื่อผู้ใช้หรืออีเมล'
          },
          {
            name: 'pass',
            type: 'password',
            placeholder: 'รหัสผ่าน'
          }
        ],
        buttons: [
          {
            text: 'ยกเลิก',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'ยืนยัน',
            handler: async Data => {
              console.log(Data.user,Data.pass);
              for(let i=0;i<this.checkuser.length;i++){
                if((this.checkemail[i]==Data.user)||((this.checkuser[i]==Data.user))){
                  this.check=1;
                  c=i;
                  break;
                }
                else
                {
                  this.check=0;
                }

              }
              console.log(this.checkkey[c]);
              if(this.check==1){
                  this.check=0;
                  this.auth.login(this.checkemail[c], Data.pass, this.checkpass[c],this.checkkey[c]).subscribe();
                  this.global.setMyGlobalVar(this.checkuser[c]);
                  // .subscribe(
                  //   (data: any) => {
                  //     console.log('Login Success', data);
                  //     this.NavCtrl.setRoot("MenuPage");
                  //   },
                  //   (err) => console.log("Error Loging In:"),
                  // )

                  console.log('key:'+this.checkkey[c]);
                   await this.sleep(1000);
                  //  this.NavCtrl.setRoot("MenuPage");
                }
              else{
                this.check=0;
                this.error();
              }
            }
          }
        ]
      });
      prompt1.present();

  }
  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  register(){
    this.NavCtrl.push("RegisterPage")
  }

  forgetpass(){
    this.NavCtrl.push("ForgetpasswordPage");
  }
  error(){
    // let alert28 = this.AlertCtrl.create({
    //            title: 'ขออภัย!',
    //           subTitle: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    //            buttons: ['ตกลง'],
    //         });

    //          alert28.present();
             swal("ขออภัย!", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error");
  }

  // doLoginGoogle(){
  //   this.auth.loginWithGoogle();
  // }
}

