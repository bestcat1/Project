import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the AbortionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abortion',
  templateUrl: 'abortion.html',
})
export class AbortionPage {
  user;
  id;
  noti=[];
  id_noti:Observable<any[]>;
  item;

  operator=[];
  day = [];
  name;
  names = [];
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public viewCtrl:ViewController,private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.id = this.navParams.get('id');

    this.api.getTypeByKey('cattle',this.user,this.id).subscribe(data=>{
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.item = value;
      console.log(value[0]);
      this.api.getDataBreedById(this.user,this.id).subscribe(datas=>{
        var values = Object.keys(datas).map(key => datas[key]);
        values.forEach(element => {
          if(value[0].number_of_breeding == element.number_of_breeding){
            this.day.push(element.date_breeding);

          }
        });
      })
    }
    });

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
      });
    }
    });
    this.api.getNotiById(this.user,9).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap =>{
        this.noti.push(snap.day_length);
      });
    }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbortionPage');
  }
  abortion(data: NgForm) {
    console.log(data.value);
    this.api.addAbortion(this.user,data.value).subscribe();
    this.sucess();
    this.viewCtrl.dismiss();
  }
  sucess(){
    swal("เสร็จสิ้น", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
  }
}
