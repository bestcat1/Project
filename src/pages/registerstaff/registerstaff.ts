import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the RegisterstaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerstaff',
  templateUrl: 'registerstaff.html',
})
export class RegisterstaffPage {
  user;
  item: Observable<any[]>;
  check_user = [];
  check = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase
    , public AlertCtrl: AlertController, public viewCtrl: ViewController) {
    this.user = this.navParams.get('user');
    this.item = this.db.list('/User').valueChanges();
    this.item.forEach(Data => {
      Data.forEach(element => {
        this.check_user.push(element.user);
      })
    })
    this.item = this.db.list('/personnel').valueChanges();
    this.item.forEach(Data => {
      Data.forEach(element => {
        this.check_user.push(element.user);
      })
    })
    console.log(this.check_user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterstaffPage');
  }
  reg_staff(data: NgForm) {
    console.log(data.value);
    let c = 0;

    for (let i = 0; i < this.check_user.length; i++) {
      if (data.value.user == this.check_user[i]) {
        c = c;
      }
      else {
        c++;
      }
    }
    if (c == this.check_user.length) {
      this.check = true;
      if (data.value.fname != '' && data.value.lname != '' && data.value.user != '' && data.value.pass != '' && data.value.cpass != '') {
        this.db.list('/personnel').push({
          adminfarm: data.value.adminfarm
          , privilege: data.value.privilege
          , user: data.value.user
          , pass: data.value.pass
          , question: data.value.question
          , anwser: data.value.anwser
          , fname: data.value.fname
          , lname: data.value.lname
          , gender: data.value.gender
          , day_of_birth: data.value.day_of_birth
          , phone_num: data.value.phone_num
          , id_card: data.value.id_card
          , address: data.value.address
          , email: data.value.email
          , fax: data.value.fax
        });
        this.viewCtrl.dismiss();
        this.success();
      }
      else {
        this.error();
      }
    }
    else {
      this.check = false;
    }
  }
  error() {
    let alert35 = this.AlertCtrl.create({
      title: 'ขออภัย',
      subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      buttons: ['ตกลง']
    });
    alert35.present();
  }
  success() {
    let alert36 = this.AlertCtrl.create({
      title: 'เสร็จสิ้น',
      subTitle: 'สมัครผู้ใช้งานเรียบร้อยแล้ว',
      buttons: ['ตกลง']
    });
    alert36.present();
  }
}
