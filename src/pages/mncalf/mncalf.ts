import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';


/**
 * Generated class for the MncalfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mncalf',
  templateUrl: 'mncalf.html',
})
export class MncalfPage {
  user:string;
  type:any;
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  hiddentype;
  head = 0;
  a='ทั้งหมด'
  headType = 'ลูกโค';
  sub_type = [];
  breed = [];
  head_type = 0;
  color = [];
  datas:any = [];
  clearText = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,
    private api: NodeapiProvider,private alertCtrl: AlertController) {
    this.user=this.navParams.get('user');

    this.api.getBreed(this.user).subscribe(d=>{
      Object.keys(d).map(key=>d[key]).forEach(d1=>{
        this.breed.push(d1.strian);
        this.sub_type.push(d1.strian);
      })
      console.log(d);
    })
    this.api.getColor(this.user).subscribe(d=>{
      Object.keys(d).map(key=>d[key]).forEach(d1=>{
        this.color.push(d1.color);
      })
      console.log(d);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MncalfPage');
  }


  selectType(t){
    this.hiddentype = t;
    this.head = 0;
  this.a='ทั้งหมด'
    console.log(t);
    this.type = t;
      if(t == 'บันทึกข้อมูลการสูญเขา'){
      this.showDishorn();
      }
      if(t == 'บันทึกข้อมูลการตีเบอร์'){
      this.showBranding();
      }
      if (t == 'บันทึกข้อมูลการหย่านม'){
      this.showWean();
      }
  }
  initializeItems(): void {
    this.damList = this.loadeddamList;
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
  if(this.headType == 'ลูกโค'){
    this.damList = this.damList.filter((v) => {
      if(v.birth_id && q) {
        if (v.birth_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  else if(this.headType == 'แม่โค'){
    this.damList = this.damList.filter((v) => {
      if(v.dam_id && q) {
        if (v.dam_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  } else {
    this.damList = this.damList.filter((v) => {
      if(v.sire_id && q) {
        if (v.sire_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  console.log(q, this.damList.length);
  }
  selectcalf(id){
    if(this.type == 'บันทึกข้อมูลการสูญเขา'){
      this.navCtrl.push("DishorncalfPage",{user:this.user,id:id});
      }
      if(this.type == 'บันทึกข้อมูลการตีเบอร์'){
        this.navCtrl.push("BrandingcalfPage",{user:this.user,id:id});
      }
      if (this.type == 'บันทึกข้อมูลการหย่านม'){
        this.navCtrl.push("WeancalfPage",{user:this.user,id:id});
      }
  }

  showDishorn(){
    this.api.getAllCalf(this.user).subscribe(data => {
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        if(snap.horndetering == false){
          dam.push(snap);
        }
      });
    }
    else{
      dam=[];
    }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    });
  }
  showBranding(){
    this.api.getAllCalf(this.user).subscribe(data=>{
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      values.forEach(snap=>{
        if(snap.branding == false){
          dam.push(snap);
        }
      })
    }else{
      dam=[];
    }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    });
  }
  showWean(){
    this.api.getAllCalf(this.user).subscribe(data=>{
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        if(snap.wean == false){
          dam.push(snap);
        }
      });
    }
    else{
      dam=[];
    }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    })
  }
  headsearch(s){
    this.head_type = s;
    this.sub_type = [];
    console.log(s)
    if(s == 0) {
      this.sub_type = this.breed;
    } else if(s == 1){
      this.sub_type = this.color;
    }
    this.a= 'ทั้งหมด'
  }
  subsearch(s){
    console.log(s)

    if(s == 'ทั้งหมด'){
      this.damList = this.datas;
      this.loadeddamList = this.datas;
    }
    else{
    this.damList = []
    this.loadeddamList = [];
    console.log('aaaa');
    console.log(this.datas);
    console.log(this.head_type);
    if(this.head_type == 0){
      this.datas.forEach(d=>{
        console.log(d);
        if(d.breed == s){
          this.damList.push(d);
          this.loadeddamList.push(d);
        }
      })
    }
    else if(this.head_type == 1){
      this.datas.forEach(d=>{
        if(d.color == s){
          this.damList.push(d);
          this.loadeddamList.push(d);
        }
      })
    }
  }
  }
  TypeSearch(){
    let alert = this.alertCtrl.create();
    alert.setTitle('ตัวเลือกการค้นหา');
    if(this.headType == 'ลูกโค'){
      alert.addInput({
        type: 'radio',
        label: 'ลูกโค',
        value: '0',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'แม่โค',
        value: '1'
      });
      alert.addInput({
        type: 'radio',
        label: 'พ่อโค',
        value: '2',
      });

    } else if(this.headType == 'แม่โค') {
      alert.addInput({
        type: 'radio',
        label: 'ลูกโค',
        value: '0',
      });

      alert.addInput({
        type: 'radio',
        label: 'แม่โค',
        value: '1',
        checked: true
      });
      alert.addInput({
        type: 'radio',
        label: 'พ่อโค',
        value: '2',
      });
    }

    else {
      alert.addInput({
        type: 'radio',
        label: 'ลูกโค',
        value: '0',
      });

      alert.addInput({
        type: 'radio',
        label: 'แม่โค',
        value: '1',
      });
      alert.addInput({
        type: 'radio',
        label: 'พ่อโค',
        value: '2',
        checked: true
      });
    }

    alert.addButton('ยกเลิก');
    alert.addButton({
      text: 'ยืนยัน',
      handler: data => {
        console.log('Checkbox data:', data);
        if(data == 0){
          this.headType = 'ลูกโค';
        } else if(data == 1) {
          this.headType = 'แม่โค';
        } else {
          this.headType = 'พ่อโค';
        }
        this.damList = this.datas;
        this.loadeddamList = this.datas;
        this.clearText = '';
      }
    });
    alert.present();
  }
}
