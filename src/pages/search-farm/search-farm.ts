import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SearchFarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-farm',
  templateUrl: 'search-farm.html',
})
export class SearchFarmPage {
  menu;
  myInput
  detail:any;
  key;
  adminfarm;
  namefarm
  vacancy;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu1:MenuController,
    private api:NodeapiProvider,public alertCtrl: AlertController,private auth:AuthProvider) {
    this.menu=menu1;
    this.menu.enable(true,'myMenu');
      this.onInit();
  }
  onInit(){
    console.log('test');
    this.api.getUserByPrivilege('เจ้าของฟาร์ม').subscribe(data=>{

      var value = Object.keys(data).map(key=>data[key]);
      this.detail = value
      for(let i=0;i<value.length;i++){
        this.detail[i].key = Object.keys(data)[i];
      }
    })
    this.api.getUserByEmail(this.auth.getEmail()).subscribe(data=>{
      this.key = Object.keys(data)[0];
      var value = Object.keys(data).map(key=>data[key]);
      this.vacancy = value[0].vacancy;
      this.adminfarm = value[0].adminfarm;
    this.api.getUser(value[0].adminfarm).subscribe(snap=>{
      if(snap!=null){
      var values = Object.keys(snap).map(key=>snap[key]);
      this.namefarm = 'คุณ' + values[0].fname+ ' '+ values[0].lname;
      }
    })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFarmPage');
  }
  onInput(e){
    console.log(e);
  }
  onCancel(e){
    console.log(e);
  }

  registerFarm(e){

    let alert = this.alertCtrl.create();
    alert.setTitle('ยืนยันการสมัคร');
alert.setSubTitle('ยืนยันการสมัครเข้าฟาร์มของคุณ'+e.fname+'<br>กรุณาเลือกตำแหน่ง:');
    alert.addInput({
      type: 'radio',
      label: '-',
      value: '-',
      checked: true,
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวแพทย์',
      value: 'สัตวแพทย์',
    });
    alert.addInput({
      type: 'radio',
      label: 'สัตวบาล',
      value: 'สัตวบาล',
    });
    alert.addInput({
      type: 'radio',
      label: 'พนักงานฟาร์ม',
      value: 'พนักงานฟาร์ม',

    });
    alert.addButton('ยกเลิก');
    alert.addButton({
      text: 'ยืนยัน',
      handler: data => {
       console.log(data);
       this.api.updateUser(this.key,{adminfarm: e.user,vacancy:data}).subscribe();
       this.onInit();
      }
    });
    alert.present();
    console.log(this.key);
    // const confirm = this.alertCtrl.create({
    //   title: 'สมัครเข้าฟาร์ม?',
    //   message: 'ยืนยันการสมัครเข้าฟาร์มของคุณ'+e.fname,
    //   buttons: [
    //     {
    //       text: 'ยกเลิก',
    //       handler: () => {
    //         console.log('Disagree clicked');
    //       }
    //     },
    //     {
    //       text: 'ยืนยัน',
    //       handler: () => {
    //         console.log(e.user);
    //         this.api.updateUser(this.key,{adminfarm: e.user}).subscribe();
    //         this.onInit();
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
  }

  cancel(){
    this.api.updateUser(this.key,{adminfarm: 'ยังไม่มี',vacancy: ''}).subscribe();
    this.onInit();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.onInit();
      refresher.complete();
    }, 2000);
  }
}
