import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import swal from 'sweetalert';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the EditdatauserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdatauser',
  templateUrl: 'editdatauser.html',
})
export class EditdatauserPage {
  user;
  item$: any;
  key;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public global: GlobalProvider,
    public viewCtrl: ViewController, private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    console.log(this.global.getMyGlobalVar());
    this.api.getUser(this.user).subscribe(data => {
      var value = Object.keys(data).map(key => data[key]);
      this.item$ = value;
      this.key = Object.keys(data)[0];
    });
    console.log(this.item$);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdatauserPage');
  }
  update(data: NgForm) {
    console.log(data.value);
    this.api.updateUser(this.key, data.value).subscribe(d=>{
      if(d.status=='OK'){
        swal("บันทึกเสร็จสิ้น!", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
        this.viewCtrl.dismiss();
      } else {
        swal("ผิดพลาด!", "แก้ไขข้อมูลไม่สำเร็จ", "error");
      }
    });
  }
}
