import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SettingcorralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingcorral',
  templateUrl: 'settingcorral.html',
})
export class SettingcorralPage {
  public alertPresent:any;
user;
item$;
corral=[];
data_corral:String;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public alertCtrl:AlertController, private api:NodeapiProvider) {

  }
  ionViewWillEnter(){
    this.data_corral='';
    this.corral = [];
    this.alertPresent=false;
    this.user=this.navParams.get('user');
    console.log(this.user);
    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.item$ = value;
      for(let i = 0 ; i < value.length;i++){
        this.item$[i].key = Object.keys(data)[i];
      }
    }
    });

    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      value.forEach(snap=>{
        this.corral.push(snap.corral);
      })
      console.log(this.corral);
    }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingcorralPage');
  }
  addcorral(data:NgForm){
    console.log(data.value);
    if(data.value.corral!=''){
    this.api.addCorral(this.user,data.value).subscribe();
     this.data_corral='';
    this.ionViewWillEnter();
    } else {
      swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
    }

  }
  removecorral(n,c){
    let check=0;
    console.log(n,c)
      console.log(this.corral,this.corral.length)
      for(let i = 0 ;i<this.corral.length;i++){
        if(this.corral[i]==c){
          check++;
        }
        else{
          check=check;
        }
      }
      if(check==0){
         this.api.removeCorral(this.user,n).subscribe();
         this.ionViewWillEnter();
      }
      else{
        let alert39 = this;
        alert39.alertPresent=true;
        alert39.alertCtrl.create({
          title: 'คำเตือน',
          subTitle: 'มีการใช้ข้อมูลคอกโค '+ check +' รายการ<br>กรุณาแก้่ไขข้อมูลโค',
          buttons: [
            {
              text: 'ยกเลิก',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                alert39.alertPresent=false;
              }
            },
            {
              text: 'แก้ไขข้มูล',
              handler: () => {
                this.navCtrl.push("MncattlePage",{user:this.user,corral:c,type:'editcow'})
                alert39.alertPresent=false;
              }
            }
          ]
        }).present();
      }
      this.ionViewWillEnter();
  }
  editcorral(k,c){
    console.log(c);
        let t=[];
        this.api.getCattleByCorral(this.user,c).subscribe(data=>{
          if(data!=null){
          t=Object.keys(data);
          }
        })
        let alert40 = this.alertCtrl.create({
          title: 'ชื่อคอก',
          inputs: [
            {
              name: 'e_corral',
              value: c ,
            }
          ],
          buttons: [
            {
              text: 'ยกเลิก',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'ยืนยัน',
              handler: data => {
                console.log(c,data.e_corral);
                this.api.updateCorral(this.user,k,{corral:data.e_corral}).subscribe();
                for(let j=0;j<t.length;j++){
                  this.api.updateType('cattle',this.user,t[j],{corralcattle:data.e_corral}).subscribe();

                }
                t=[];
                this.ionViewWillEnter();

              }
            }
          ]
        });
        alert40.present();
      }
}
