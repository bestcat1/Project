import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Slides } from 'ionic-angular';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})

export class DeliveryPage {
  name;
  operator = [];
  count_calf = 0;
  count_calfs;
  user: string;
  date;
  item;
  id;
  sire: Observable<any[]>;
  cattle: Observable<any[]>;
  sire_id;
  count_breed;
  strian:any;
  notification: Observable<any[]>;
  noti: Observable<any[]>;
  color;
  count_noti = [];
  noti_length = [];
  calf = [];
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public alertCtrl: AlertController, public viewCtrl: ViewController,private api:NodeapiProvider) {

    this.id = this.navParams.get('id');
    this.user = this.navParams.get('user');

    this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.item = values;
      this.item[0].key = Object.keys(data)[0];
        this.count_breed = values[0].number_of_breeding;
        console.log(this.count_breed);
    }
    })

    this.api.getDataBreedById(this.user,this.id).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        console.log(snap.number_of_breeding)
        if(snap.number_of_breeding == this.count_breed)
        this.sire_id = snap.sire_id;
      });
    }
    console.log('number breed'+ this.count_breed);
    console.log('sire '+ this.sire_id);
    })
    this.api.getBreed(this.user).subscribe(data=>{
      if(data!=null){
      this.strian = Object.keys(data).map(key=>data[key]);
      console.log(this.strian);
      }
    })

    this.api.getColor(this.user).subscribe(data=>{
      if(data!=null){
      this.color = Object.keys(data).map(key=>data[key]);
      }
    })

    this.api.getNotiById(this.user,5).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.noti_length.push(values[0].day_length);
      }
    })
    this.api.getNotiById(this.user,6).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.noti_length.push(values[0].day_length);
      }
    })
    this.api.getNotiById(this.user,4).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.noti_length.push(values[0].day_length);
      }
    })

    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      this.name = values[0].fname+' '+values[0].lname;
      this.operator.push(values[0].fname+' '+values[0].lname);
      }
    });

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        this.operator.push(snap.fname+' '+snap.lname);
      })
    }
    })
    var d = new Date();
    this.date = d.getFullYear() + "-" + month_of_the_year(d) + "-" + day_of_the_month(d);
    function day_of_the_month(d) {
      return (d.getDate() < 10 ? '0' : '') + d.getDate();
    }
    function month_of_the_year(d) {
      return ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    }

  }

  @ViewChild(Slides) slides: Slides;
  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }
  dv(data: NgForm, k) {
    console.log(data.value.date,k);
    this.calclate(data.value.date);

    if (data.value.status == "" || data.value.cout_calf == "" || data.value.sire_id == "") {

      const alert21 = this.alertCtrl.create({
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        buttons: ['ตกลง']
      });
      alert21.present();
    }
    else {
      let alert22 = this.alertCtrl.create({
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
            this.api.addDelivery(this.user,{ dam_id: data.value.dam_id, date: data.value.date, count_calf: data.value.count_calf, sire_id: data.value.sire_id, recoder: data.value.recoder, operator: data.value.operator }).subscribe();
            this.api.updateType('cattle',this.user,k,{ status: "คลอดแล้ว" }).subscribe();
              if (this.count_calf == 1) {
                this.calf = [];
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid0, name_cattle: data.value.name_cattle0, breed: data.value.spi0, color: data.value.colorcattle0, sex: data.value.sexct0, birth_weight: data.value.birth_weight0 ,horndetering:false,branding:false,wean:false}).subscribe();
                this.calf = [data.value.bid0];
                this.calclate(data.value.date);
              }
              else if (this.count_calf == 2) {
                this.calf = []
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid0, name_cattle: data.value.name_cattle0, breed: data.value.spi0, color: data.value.colorcattle0, sex: data.value.sexct0, birth_weight: data.value.birth_weight0,horndetering:false,branding:false,wean:false }).subscribe();
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid1, name_cattle: data.value.name_cattle1, breed: data.value.spi1, color: data.value.colorcattle1, sex: data.value.sexct1, birth_weight: data.value.birth_weight1,horndetering:false,branding:false,wean:false }).subscribe();
                this.calf = [data.value.bid0, data.value.bid1];
                this.calclate(data.value.date);
              }
              else if (this.count_calf == 3) {
                this.calf = [];
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid0, name_cattle: data.value.name_cattle0, breed: data.value.spi0, color: data.value.colorcattle0, sex: data.value.sexct0, birth_weight: data.value.birth_weight0,horndetering:false,branding:false,wean:false }).subscribe();
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid1, name_cattle: data.value.name_cattle1, breed: data.value.spi1, color: data.value.colorcattle1, sex: data.value.sexct1, birth_weight: data.value.birth_weight1,horndetering:false,branding:false,wean:false }).subscribe();
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid2, name_cattle: data.value.name_cattle2, breed: data.value.spi2, color: data.value.colorcattle2, sex: data.value.sexct2, birth_weight: data.value.birth_weight2,horndetering:false,branding:false,wean:false }).subscribe();
                this.calf = [data.value.bid0, data.value.bid1, data.value.bid2];
                this.calclate(data.value.date);
              }
              else if (this.count_calf == 4) {
                this.calf = [];
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid0, name_cattle: data.value.name_cattle0, breed: data.value.spi0, color: data.value.colorcattle0, sex: data.value.sexct0, birth_weight: data.value.birth_weight0,horndetering:false,branding:false,wean:false }).subscribe();
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid1, name_cattle: data.value.name_cattle1, breed: data.value.spi1, color: data.value.colorcattle1, sex: data.value.sexct1, birth_weight: data.value.birth_weight1,horndetering:false,branding:false,wean:false }).subscribe();
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid2, name_cattle: data.value.name_cattle2, breed: data.value.spi2, color: data.value.colorcattle2, sex: data.value.sexct2, birth_weight: data.value.birth_weight2,horndetering:false,branding:false,wean:false }).subscribe();
                this.api.addCalf(this.user,{ dam_id: data.value.dam_id,sire_id:this.sire_id, birth_id: data.value.bid3, name_cattle: data.value.name_cattle3, breed: data.value.spi3, color: data.value.colorcattle3, sex: data.value.sexct3, birth_weight: data.value.birth_weight3,horndetering:false,branding:false,wean:false }).subscribe();
                this.calf = [data.value.bid0, data.value.bid1, data.value.bid2, data.value.bid3];
                this.calclate(data.value.date);
              }

              this.SweetAlert();
              this.viewCtrl.dismiss();
            }

          }
        ]
      });
      alert22.present();
    }
  }

  SweetAlert() {
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
  test(a) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.count_calfs = [];
    for (let i = 0; i < a; i++) {
      this.count_calfs.push(i);
    }
    this.count_calf = a;
    console.log(a);
    this.slides.lockSwipes(true);
  }
  nextslide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);

  }
  backslide() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  calclate(date) {
    var y1k = new Date(date);
        y1k.setDate(y1k.getDate() + this.noti_length[0]);
    var test1 = y1k.getFullYear() + "-" + (y1k.getMonth() + 1) + "-" + y1k.getDate();
    y1k = new Date(date);
    y1k.setDate(y1k.getDate() + this.noti_length[1]);
    var test2 = y1k.getFullYear() + "-" + (y1k.getMonth() + 1) + "-" + y1k.getDate();
    y1k = new Date(date);
        y1k.setDate(y1k.getDate() + this.noti_length[2]);
    var test3 = y1k.getFullYear() + "-" + (y1k.getMonth() + 1) + "-" + y1k.getDate();
    console.log(test1,test2,test3);
    for (let i = 0; i < this.calf.length; i++) {
      this.api.addNoti(this.user,test1,{id_cattle: this.calf[i], type: 'การสูญเขาลูกโค', date: test1 }).subscribe();
      this.api.addNoti(this.user,test2,{ id_cattle: this.calf[i], type: 'การตีเบอร์ลูกโค', date: test2 }).subscribe();
      this.api.addNoti(this.user,test3,{ id_cattle: this.calf[i], type: 'การหย่านมลูกโค', date: test3 }).subscribe();
    }

  }
}
