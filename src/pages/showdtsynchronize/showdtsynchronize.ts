import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the ShowdtsynchronizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtsynchronize',
  templateUrl: 'showdtsynchronize.html',
})
export class ShowdtsynchronizePage {
user;
data;
item=[];
syncs;
pro_sync=[];
pro;
operator = [];
edit=true;
DetailPro;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public modalCtrl:ModalController,private api:NodeapiProvider) {
    this.data=this.navParams.get('key');
    this.user=this.navParams.get('user');
    this.pro = this.data.program_sync;
    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    });

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      for(let i = 0; i<values.length;i++){
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
      }
    }
    });
    this.api.getProgramSync(this.user).subscribe(data=>{
      if(data!=null){
      this.syncs = Object.keys(data).map(key=>data[key]);
      }
    })

    this.pro=this.data.program_sync;
    this.api.getDrugProgramSync(this.user,this.data.program_sync).subscribe(data=>{
      console.log(data);
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.DetailPro = value;
    }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtsynchronizePage');
  }


  sync(data:NgForm){
    console.log(data.value);
    this.api.updateSyncByKey(this.user,this.data.key,data.value).subscribe(d=>{
      if(d.status == 'OK'){
        swal("เสร็จสิ้น", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
      this.navCtrl.pop();
      }
    });

  }
  promain(p){
    this.pro=p;
    this.api.getDrugProgramSync(this.user,p).subscribe(data=>{
      console.log(data);
      if(data!=null){
      var value = Object.keys(data).map(key=>data[key]);
      this.DetailPro = value;
    }
    });
  }
  verifypro(){
    console.log(this.DetailPro);
    const modal = this.modalCtrl.create("VerifyProSyncPage",{user:this.user,program:this.pro,detail:this.DetailPro});
    modal.present();
  }
  check(a){
    this.edit = a;
  }
}
