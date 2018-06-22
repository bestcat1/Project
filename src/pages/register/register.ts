import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  item:Observable<any[]>;
  aa:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase,public AlertCtrl:AlertController,public menu:MenuController) {
  this.item=this.db.list('/User').valueChanges();
  this.item.subscribe(async Data=>{
  this.aa=true;
  this.menu=menu;
  this.menu.enable(false,'myMenu');
  });

}
 ;
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  reg(data:NgForm){

    console.log(this.aa);
    var c=0,i,exit=0;
    this.item.subscribe(async Data=>{
    if(data.value.fname!=''&&data.value.lname!=''&&data.value.user!=''&&data.value.pass!=''&&data.value.cpass!='')
    {
      exit=0
      c=0;
      if(data.value.pass==data.value.cpass)
      {
        for(i=0;i<Data.length;i++){

          if(data.value.user!=Data[i].user){
            c++;
          }
          else{
            c=0;
          }
        }
        if(c==Data.length){
          this.db.list('/User').push(data.value);
          exit=1;
          this.navCtrl.setRoot(HomePage);

        }
        else if(exit==0) {
          this.aa=false;
          exit=1;

        }

      }
      else{
          let alert = this.AlertCtrl.create({
          title: 'ขออภัย',
          subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          buttons: ['ตกลง']
          });
        alert.present();
      }

    }
    else{
      let alert = this.AlertCtrl.create({
        title: 'ขออภัย!',
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  });


}
}
