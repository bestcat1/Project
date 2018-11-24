import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
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
detail:Observable<any[]>;
notification:Observable<any[]>;
test:Observable<any[]>;
detail_user=[];
  user:string;
email;
loader;
showname;
myPhotoURL;
  constructor(public localNotifications:LocalNotifications,public navCtrl: NavController
    , public navParams: NavParams,public menu:MenuController,public global: GlobalProvider
    ,private db:AngularFireDatabase,public alertCtrl:AlertController,
    private auth:AuthProvider,private api: NodeapiProvider,
    private loadingCtrl: LoadingController) {
      console.log('MenuPage');

      this.presentLoading();


        firebase.database().ref('/User').orderByChild('email').equalTo(this.auth.getEmail()).once('child_added',datas=>{
          var d = new Date();
          var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

          this.global.setMyGlobalVar(datas.val().user);
          if(datas.val().count_login==0){
          this.loader.dismiss();
        let noti=[{id_noti:0,list:'ผสมพันธุ์',day_length:18,note:'หลังผสมไม่ติด'},
            {id_noti:1,list:'ตรวจท้อง',day_length:28,note:'หลังผสมพันธุ์'},
            {id_noti:2,list:'คลอด',day_length:283,note:'หลังจากตั้งท้อง'},
            {id_noti:3,list:'เหนี่ยวนำการกลับสัด',day_length:60,note:'หลังจากคลอด'},
            {id_noti:4,list:'สูญเขา',day_length:60,note:'หลังจากเกิด'},
            {id_noti:5,list:'หย่านม',day_length:180,note:'หลังจากเกิด'},
            {id_noti:6,list:'ตีเบอร์',day_length:240,note:'หลังจากเกิด'},
            {id_noti:7,list:'บันทึกน้ำหนักลูกโค 1 ปี',day_length:365,note:'หลังจากเกิด'},
            {id_noti:8,list:'การรักษา',day_length:1,note:'การรักษา'},
            {id_noti:9,list:'เหนี่ยวนำการกลับสัด',day_length:61,note:'หลังจากโคแท้ง'},
            {id_noti:10,list:'เหนี่ยวนำการกลับสัด',day_length:20,note:'เหนี่ยวนำการกลับสัด'},
            {id_noti:11,list:'ผสมพันธุ์',day_length:21,note:'หลังจากเหนี่ยวนำการกลับสัด'},];
            swal("ยินดีต้อนรับ!", "การเข้าลงชื่อเข้าใช้ครั้งแรก กรุณาตั้งค่าระบบฟาร์มของท่าน", "warning").then(()=>{
              this.navCtrl.push("SettingfarmPage",{user: datas.val().user});
              this.db.list('/User').update(datas.key,{count_login:'1'});
              for(let i = 0 ;i<noti.length;i++){
                this.db.list('/setting/notification/'+datas.val().user).push(noti[i]);
              }
            });
          }
        })



    this.menu=menu;
    this.menu.enable(true,'myMenu');

  }

  ionViewWillEnter(){
    this.count_notification=0;
    var i=0;
    var user=this.global.getMyGlobalVar();
    var localNotification = this.localNotifications;

    localNotification.clearAll();
    firebase.database().ref().child('/notification/'+user).on("child_added",function(snap){
      var a;
       firebase.database().ref().child('/notification/'+user+'/'+snap.key).on("value",function(snap){
         a=snap.numChildren();
       });

      let day = new Date(snap.key).getDate();
        let year = new Date(snap.key).getFullYear();
        let month = new Date(snap.key).getMonth();
        let time1 = new Date(year, month, day, 7, 0, 0, 0);
        localNotification.schedule({
          id: i,
          title: 'แจ้งเตือน',
          text: 'วันนี้มีรายการจัดการ '+ a+' รายการ',
          trigger: { at: new Date(time1) },
        });
      i++;
    });

    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

    this.notification=this.db.list('/notification/'+user+'/'+date).valueChanges();


    this.api.getUserByEmail(this.auth.getEmail()).subscribe(datas=>{
      if(datas!=null){
      var value = Object.keys(datas).map(key=>datas[key]);
      this.showname = value[0].fname + ' ' + value[0].lname;
      firebase.storage().ref().child('Photos/'+value[0].user+'/Logo').getDownloadURL().then((url)=>{
        this.myPhotoURL=url;
      });
      this.api.showAlertDate(value[0].user).subscribe(data1=>{
        if(data1!=null){
        Object.keys(data1).forEach(snap=>{

          this.api.showAlertDateDetail(value[0].user,snap).subscribe(element=>{
            if(element!=null){
            this.count_notification+=Object.keys(element).length;
            console.log('xxx: '+this.count_notification);
            }
          })

        })
      }
      })
    }
    });
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
    this.navCtrl.push("VerifyPage",{user: this.global.getMyGlobalVar()});
  }
  report(){
    this.navCtrl.push("ReportPage",{user: this.global.getMyGlobalVar()});
  }
  notificationview(){
    this.navCtrl.push("NotificationPage",{user: this.global.getMyGlobalVar()});
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
