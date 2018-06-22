import { Component } from '@angular/core';
import { NavController,AlertController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logout:number;
  check:number=0;
  item : Observable<any[]>;
  constructor(public NavCtrl: NavController, private db: AngularFireDatabase,
     public navParams: NavParams,public AlertCtrl: AlertController,public menu:MenuController){
    this.item=this.db.list('/User').valueChanges();
    this.logout=this.navParams.get('logout');
    this.check=0;
    this.menu=menu;
    this.menu.enable(false,'myMenu')
  }


  login(){
    var i,a="";
    const prompt = this.AlertCtrl.create({
      title: 'ลงชื่อเข้าใช้',
      message: a,
      inputs: [
        {
          name: 'user',
          placeholder: 'ชื่อผู้ใช้'
        },
        {
          name: 'pass',
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
          handler: Data => {
            this.item.subscribe(async data=>{
              for(i=0;i<data.length;i++)
              {
                if((Data.user==data[i].user)&&(Data.pass==data[i].pass))
                {
                  this.check=1;
                  break;
                }
                else
                {
                  this.check=0;
                }
              }
              console.log(this.check);
              if(this.check==1)
              {
                await this.sleep(500);
                this.NavCtrl.setRoot("MenuPage",{user: data[i].user});
              }
              else
              {
                let alert = this.AlertCtrl.create({
                  title: 'ขออภัย!',
                  subTitle: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                  buttons: ['ตกลง'],
                });

                alert.present();
              }
          });
          }
        }
      ]
    });
    prompt.present();
  }
  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  register(){
    this.NavCtrl.push("RegisterPage")
  }

}

