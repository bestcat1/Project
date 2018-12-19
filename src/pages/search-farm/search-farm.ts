import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
import { AuthProvider } from '../../providers/auth/auth';
import { SplashScreen } from '@ionic-native/splash-screen';

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
  loadedDetailList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu1:MenuController,
    private api:NodeapiProvider,public alertCtrl: AlertController,private auth:AuthProvider,
    private splashScreen: SplashScreen) {
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
        this.api.getPicLogoFromStorage(value[i].user).subscribe(data1=>{
          var value1 = Object.keys(data1).map(key=>data1[key]);
          this.detail[i].farmname = value1[0].farm_name_TH;
        })
        this.detail[i].key = Object.keys(data)[i];
      }
      console.log(this.detail);
      this.loadedDetailList = this.detail;
    })
    this.api.getUserByEmail(this.auth.getEmail()).subscribe(data=>{
      this.key = Object.keys(data)[0];
      var value = Object.keys(data).map(key=>data[key]);
      this.vacancy = value[0].vacancy;
      console.log(value[0].privilege);
      if(value[0].privilege != 'ยังไม่ได้อนุมัติ') {
        this.splashScreen.show();
        window.location.reload();
      }
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


  initializeItems(): void {
    this.detail = this.loadedDetailList;
  }
  getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;

  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.detail = this.detail.filter((v) => {
    if(v.farmname && q) {
      if (v.farmname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.detail.length);
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
       this.api.updateUser(this.key,{adminfarm: e.user,vacancy:data}).subscribe(d=>{
         console.log(d);
         if(d.status=='OK'){
          swal("เสร็จสิ้น", "สมัครเช้าใช้งานฟาร์มเรียบร้อยแล้ว", "success");
          this.onInit();
         }
       });

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

    const confirm = this.alertCtrl.create({
      title: 'ยกเลิกการสมัครเข้าฟาร์ม?',
      message: 'คุณต้องการยกเลิกการสมัครเข้าฟาร์มหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.api.updateUser(this.key,{adminfarm: 'ยังไม่มี',vacancy: ''}).subscribe(d=>{
              if(d.status=='OK'){
                swal("เสร็จสิ้น", "ยกเลิกการสมัครเรียบร้อยแล้ว", "success");
                this.onInit();
               }
            });
          }
        }
      ]
    });
    confirm.present();


  }
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.onInit();
      refresher.complete();
    }, 2000);
  }
}
