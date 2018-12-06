import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the CorralsyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-corralsync',
  templateUrl: 'corralsync.html',
})
export class CorralsyncPage {
  selectedQuestions: string[] = [];
  dams = [];
  name:any;

  operator=[];
  time;
  date;
  corral;
  user;
  dam;
  count;
  pro;
  idcheck = [];
  syncs;
  checkpro=true;
  AlertDate;
  constructor(public navCtrl: NavController, public navParams: NavParams
  , public alertCtrl: AlertController
    , public viewCtrl: ViewController, public modalCtrl: ModalController,
    private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.api.getProgramSync(this.user).subscribe(data=>{
      if(data!=null){
      this.syncs = Object.keys(data).map(key=>data[key]);
      }
    });

    this.api.getNotiById(this.user,11).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.AlertDate = value[0];
    })

    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
      this.corral = Object.keys(data).map(key=>data[key]);
      }
    })

    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.name = values[0].fname+' '+values[0].lname;
      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    })
    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
      }
    }
    })

    var d = new Date();
    this.time = d.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: false });


    this.date = d.getFullYear() + "-" + month_of_the_year(d) + "-" + day_of_the_month(d);
    function day_of_the_month(d) {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d) {
      return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorralsyncPage');
  }
  corralsync(data: NgForm) {
    if (data.value.corralcattle == "" || data.value.program_sync == "") {
      const alert18 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert18.present();
    }
    else {
      let alert19 = this.alertCtrl.create({
        title: 'การบันทึก',
        message: 'ยืนยันการบันทึกข้อมูล?',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'ยืนยัน',
            handler: () => {

              console.log(data.value);
              let j = 0;
              var dataSync=[];
              var key = [];
              var dataNoti=[];
                  for (j = 0; j < this.idcheck.length; j++) {
                      dataSync.push({ dam_id: this.idcheck[j].id, date: data.value.datepro, program_sync: data.value.program_sync, operator: data.value.operator, recoder:data.value.recoder });
                      // this.api.addDataType('synchronize', this.user, { dam_id: this.idcheck[j].id, date: data.value.datepro, program_sync: data.value.program_sync, operator: data.value.operator, recoder:data.value.recoder }).subscribe();
                      key.push(this.idcheck[j].key);
                      // this.api.updateType('cattle',this.user,this.idcheck[j].key,{status:'เหนี่ยวนำแล้ว'}).subscribe();
                      var test = new Date(data.value.datepro);
                      test.setDate(test.getDate() + Number(this.AlertDate.day_length));
                      var setDate = test.getFullYear() + "-" + (test.getMonth() + 1) + "-" + test.getDate();
                      dataNoti.push({id_cattle: this.idcheck[j].id, type: this.AlertDate.list, date: setDate });
                      // this.api.addNoti(this.user,setDate,{id_cattle: this.idcheck[j].cattle_id.value.dam_id, type: this.AlertDate.list, date: setDate }).subscribe()
                  }
              this.api.addSyncCorral(this.user,dataSync).subscribe();
              this.api.updateCattleCorral(this.user,key,'เหนี่ยวนำแล้ว').subscribe();
              this.api.addNotiMultiple(this.user,dataNoti).subscribe();
              this.success();
              this.viewCtrl.dismiss();
            }

          }
        ]
      });
      alert19.present();


    }
  }


  selectcorral(n) {
    this.dams = [];
    console.log(n);
    this.api.getCattleByCorral(this.user, n).subscribe(data=>{
      var values = Object.keys(data).map(key=> data[key]);
      for(let i = 0; i < values.length; i++){
        if (values[i].sex == 'MISS'&&values[i].status=='บำรุงแล้ว') {
          this.dams.push({ id:values[i].cattle_id ,key:Object.keys(data)[i]});
        }
      }

    })
    this.idcheck = [];
    this.selectedQuestions = [];
  }

  clickSelectBox(itemKey, k) {

    const foundAt = this.selectedQuestions.indexOf(itemKey);

    if (foundAt >= 0) {
      this.idcheck.splice(foundAt, 1);
      this.selectedQuestions.splice(foundAt, 1);

    } else {
      this.idcheck.push({ id: itemKey, key: k });
      this.selectedQuestions.push(itemKey);
    }
    console.log(this.idcheck);
  }
  promain(p) {
    this.pro = p;
    this.checkpro=false;
  }

  verifypro() {
    const modal = this.modalCtrl.create("VerifyProSyncPage", { user: this.user, program: this.pro });
    modal.present();
  }
  success() {
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
}
