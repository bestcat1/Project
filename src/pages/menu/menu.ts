import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AuthProvider } from '../../providers/auth/auth';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',

})

export class MenuPage {
count_notification=0;
count_login:any;
key;

detail_user=[];
  user:string;
email;
loader;
showname;
myPhotoURL;
privilege;

m1=false;
m2=false;
m3=false;
m4=false;
m5=false;
m6=false;
  constructor(public localNotifications:LocalNotifications,public navCtrl: NavController
    , public navParams: NavParams,public menu:MenuController,public global: GlobalProvider
    ,public alertCtrl:AlertController,
    private auth:AuthProvider,private api: NodeapiProvider,
    private loadingCtrl: LoadingController) {
      console.log('MenuPage');

      this.presentLoading();
      this.api.getUserByEmail(this.auth.getEmail()).subscribe(data=>{
        console.log(data);
        var value = Object.keys(data).map(key=>data[key]);
        if(value[0].privilege=='เจ้าของฟาร์ม'){
          this.m1=true;
          this.m2=true;
          this.m3=true;
          this.m4=true;
          this.m5=true;
          this.m6=true;

          this.privilege = value[0].privilege;

        console.log(value[0].user);
        // var d = new Date();
        // var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

        this.global.setMyGlobalVar(value[0].user);
        if(value[0].count_login==0){
        this.loader.dismiss();
      let noti=[{id_noti:0,list:'เหนี่ยวนำกลับสัด',day_length:18,note:'หลังผสมไม่ติด'},
          {id_noti:1,list:'ตรวจท้อง',day_length:90,note:'หลังผสมพันธุ์'},
          {id_noti:2,list:'คลอด',day_length:193,note:'หลังจากตั้งท้อง'},
          {id_noti:3,list:'บำรุงแม่พันธุ์',day_length:60,note:'หลังจากคลอด'},
          {id_noti:4,list:'สูญเขา',day_length:60,note:'หลังจากเกิด'},
          {id_noti:5,list:'หย่านม',day_length:180,note:'หลังจากเกิด'},
          {id_noti:6,list:'ตีเบอร์',day_length:240,note:'หลังจากเกิด'},
          {id_noti:7,list:'บันทึกน้ำหนักลูกโค 1 ปี',day_length:365,note:'หลังจากเกิด'},
          {id_noti:8,list:'การรักษา',day_length:1,note:'การรักษา'},
          {id_noti:9,list:'เหนี่ยวนำการกลับสัด',day_length:61,note:'หลังจากโคแท้ง'},
          {id_noti:10,list:'เหนี่ยวนำการกลับสัด',day_length:18,note:'บำรุงแม่พันธุ์'},
          {id_noti:11,list:'ผสมพันธุ์',day_length:21,note:'หลังจากเหนี่ยวนำการกลับสัด'},];
          swal("ยินดีต้อนรับ!", "การเข้าลงชื่อเข้าใช้ครั้งแรก กรุณาตั้งค่าระบบฟาร์มของท่าน", "warning").then(()=>{
            this.presentLoading();
            this.api.updateUser(Object.keys(data)[0],{count_login:'1'}).subscribe(d=>{
              if(d.status=='OK'){
                this.api.addNotiall(value[0].user,noti).subscribe(d0=>{
                  if(d0.status == 'OK'){
                    this.api.addColor(value[0].user,{color:'น้ำตาล'}).subscribe(d1=>{
                      if(d1.status=='OK'){
                        this.api.addCorral(value[0].user,{corral:'คอกที่1'}).subscribe(d2=>{
                          if(d2.status=='OK'){
                            this.api.addSettingBreed(value[0].user,{strian:'พื้นเมือง'}).subscribe(d3=>{
                              if(d3.status=='OK'){
                                this.api.addHerdNumber(value[0].user,{herd_num:'01'}).subscribe(d4=>{
                                  if(d4.status=='OK'){
                                    this.api.addProgram_maintain(value[0].user,{pro_maintain:'บำรุงก่อนคลอด'}).subscribe(d=>{
                                      if(d.status=='OK'){
                                        this.api.addProgramSync(value[0].user,{pro_sync:'ProgramA'}).subscribe(d=>{
                                          if(d.status=='OK'){
                                            this.endPresent();
                                            this.navCtrl.push("SettingPage",{user: value[0].user,type:'ตั้งค่าระบบฟาร์ม'});
                                          }
                                        });
                                      }
                                    });
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                });
              }
            });
          });
        }
      }
      else{
        console.log(value[0].adminfarm);
        this.global.setMyGlobalVar(value[0].adminfarm);
        this.privilege = value[0].privilege;
        if(value[0].privilege=='พนักงานฟาร์ม'){
          this.m1=false;
          this.m2=false;
          this.m3=false;
          this.m4=false;
          this.m5=false;
          this.m6=true;
        }
        else{
          this.m1=false;
          this.m2=true;
          this.m3=true;
          this.m4=true;
          this.m5=false;
          this.m6=true;
        }
      }
      });


    this.menu=menu;
    this.menu.enable(true,'myMenu');

  }

  ionViewWillEnter(){

    this.count_notification=0;
    var i=0;

    this.localNotifications.clearAll();


    // var d = new Date();

    this.api.getUserByEmail(this.auth.getEmail()).subscribe(datas=>{
      if(datas!=null){
      var value = Object.keys(datas).map(key=>datas[key]);
      if(value[0].privilege=='เจ้าของฟาร์ม')
      {

      this.api.getPicLogoFromStorage(value[0].user).subscribe(data2=>{
        var values = Object.keys(data2).map(key=>data2[key]);
        this.myPhotoURL = values[0].logo_base64;
        this.showname = values[0].farm_name_TH;
      })

      this.api.showAlertDate(value[0].user).subscribe(data1=>{
        if(data1!=null){
        Object.keys(data1).forEach(snap=>{

          this.api.showAlertDateDetail(value[0].user,snap).subscribe(element=>{
            if(element!=null){

            this.count_notification+=Object.keys(element).length;
            console.log('xxx: '+this.count_notification+'yyy:'+snap+'sdasd'+i);
            let day = new Date(snap).getDate();
            let year = new Date(snap).getFullYear();
            let month = new Date(snap).getMonth();
            let time1 = new Date(year, month, day, 7, 0, 0, 0);
            console.log(time1);
            this.localNotifications.schedule({
          id: i,
          title: 'แจ้งเตือน',
          // text: 'วันนี้มีรายการจัดการ ' + Object.keys(element).length + ' รายการ\n',
          text: this.textnoti(Object.keys(element).map(key=>element[key]),snap),
          trigger: { at: new Date(time1) },
         });
         console.log( this.textnoti(Object.keys(element).map(key=>element[key]),snap));

         i++;
            }
          })

        })
      }
      })
    }
    else{
      this.api.showAlertDate(value[0].adminfarm).subscribe(data1=>{
        if(data1!=null){
        Object.keys(data1).forEach(snap=>{

          this.api.showAlertDateDetail(value[0].adminfarm,snap).subscribe(element=>{
            if(element!=null){

            this.count_notification+=Object.keys(element).length;
            console.log('xxx: '+this.count_notification+'yyy:'+snap+'sdasd'+i);
            let day = new Date(snap).getDate();
            let year = new Date(snap).getFullYear();
            let month = new Date(snap).getMonth();
            let time1 = new Date(year, month, day, 7, 0, 0, 0);
            console.log(time1);
            this.localNotifications.schedule({
          id: i,
          title: 'แจ้งเตือน',
          // text: 'วันนี้มีรายการจัดการ ' + Object.keys(element).length + ' รายการ' ,
          text: this.textnoti(Object.keys(element).map(key=>element[key]),snap),
          trigger: { at: new Date(time1) },
         });
         i++;
            }
          })

        })
      }
      })



      this.api.getUser(value[0].adminfarm).subscribe(data=>{
        console.log(data);
        var value = Object.keys(data).map(key=>data[key]);
        // this.showname = value[0].fname + ' ' + value[0].lname;
        this.api.getPicLogoFromStorage(value[0].user).subscribe(data2=>{
          var value = Object.keys(data2).map(key=>data2[key]);
          this.myPhotoURL = value[0].logo_base64;
          this.showname = value[0].farm_name_TH;
        })
      })

    }
  }
    });
  }

  textnoti(value,date){
    var d = new Date(date);
    var datts = d.getDate() + '/'+(d.getMonth()+1)+'/'+d.getFullYear();
   var text='';
   var c = [];

  for(let i = 0 ; i< value.length;i++){
    if(i == 0){
      c.push({type:value[i].type,count:0})
    }
    else {
      for(let j = 0; j<c.length;j++){
        if(c[j].type != value[i].type){
          c.push({type:value[i].type,count:0});
          break;
        }
      }
    }
  }
  for(let i =0;i<c.length;i++){
    for(let j=0;j<value.length;j++){
      if(c[i].type == value[j].type){
        c[i].count++;
      }
    }
  }
  text += 'วันที่'+datts+' มีรายการจัดการ '+value.length+' รายการ\n';
  c.forEach(element=>{
    text += element.type+' '+element.count+' รายการ\n';
  })
    return text;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  mncattle(){
    var text = 'ทั้งหมด'
   this.navCtrl.push("MncattlePage",{user:this.global.getMyGlobalVar(), corral:text,type:'addcow'});
  }
  mndam(){
    this.navCtrl.push("MndamPage",{user:this.global.getMyGlobalVar()});
  }
  mncalf(){
    this.navCtrl.push("MncalfPage",{user: this.global.getMyGlobalVar()});
  }
  setting(){
    this.navCtrl.push("SettingPage",{user: this.global.getMyGlobalVar()});
  }
  verify(){
    this.navCtrl.push("VerifyPage",{user: this.global.getMyGlobalVar(),privilege:this.privilege});
  }
  report(){
    this.navCtrl.push("ReportPage",{user: this.global.getMyGlobalVar()});
  }
  notificationview(){
    console.log(this.privilege);
    this.navCtrl.push("NotificationPage",{user: this.global.getMyGlobalVar(),privilege:this.privilege});
  }
  nurture(){
    this.navCtrl.push("SelectnurturePage",{user : this.global.getMyGlobalVar()});
  }
  sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่...",
    });
    this.loader.present();
  }
  endPresent(){
    this.loader.dismiss();
  }
}
