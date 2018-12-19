import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
// import { DatePicker } from '@ionic-native/date-picker';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

import { NgForm } from '@angular/forms';
/**
 * Generated class for the MncattlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mncattle',
  templateUrl: 'mncattle.html',
})

export class MncattlePage {
  user:string;
  date;
mncattle;
test;
checkcorral:any;
strian:any;
color:any;
owner;
currentDate:boolean;
corral:any;
public damList:Array<any>;
  public loadedDamList:Array<any>;
herd_num
select_head_type='0';
  checkcattle:any;
  search_type = 'พ่อพันธุ์/แม่พันธุ์';
  select_sex= 'ทั้งหมด';
  breeds = [];
  corrals = [];
  colors = []
  sub_type = [];
  sub_head = '0';
  select_sub_type ='ทั้งหมด';
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController
  ,private api: NodeapiProvider,public viewCtrl: ViewController ) {
    this.user=this.navParams.get('user');
    this.checkcorral=this.navParams.get('corral');
    this.mncattle = this.navParams.get('type');
    this.search_type = 'พ่อพันธุ์/แม่พันธุ์';
    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
        this.checkcattle = Object.keys(data).map(key=>data[key]);
      }
      else {
        this.checkcattle = [];
      }
    })
    this.sub_type = ['เพศผู้','เพศเมีย'];
    this.api.getCorral(this.user).subscribe(data=>{
      if(data!=null){
        var value = Object.keys(data).map(key => data[key]);
        value.forEach(d=>{
          this.corrals.push(d.corral);
        })
      }
    })
    this.api.getBreed(this.user).subscribe(data=>{
      if(data!=null){
        var value = Object.keys(data).map(key => data[key]);
        value.forEach(d=>{
          this.breeds.push(d.strian);
        })
      }
    })
    this.api.getColor(this.user).subscribe(data=>{
      if(data!=null){
        var value = Object.keys(data).map(key => data[key]);
        value.forEach(d=>{
          this.colors.push(d.color);
        })
      }
    })
  }

  ionViewWillEnter(){
    this.addCattle();
    this.editpage();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MncattlePage');
  }


//-------------------------Edit page-------------------------------
  editpage(){
    this.select_sub_type= 'ทั้งหมด';
    this.user=this.navParams.get('user');
    if(this.search_type == 'พ่อพันธุ์/แม่พันธุ์'){
      if(this.checkcorral=='ทั้งหมด'){
        this.api.getAllCattle(this.user).subscribe(data=>{
          var dam ;
          if(data!=null){
         dam = Object.keys(data).map(key => data[key]);
        this.damList = dam;
        this.loadedDamList = dam;
      }else {
        dam = [];

      }
      this.damList = dam;
      this.loadedDamList = dam;
        });
      }
      else{
      this.api.getCattleByCorral(this.user, this.checkcorral).subscribe(data=>{
        var dam ;
        if(data!=null){
           dam = Object.keys(data).map(key => data[key]);

        } else {
          dam = [];
        }
        this.damList = dam;
        this.loadedDamList = dam;
      });
      }
    }else {
      this.api.getAllCalf(this.user).subscribe(data=>{
        var calf
        if(data!=null){
          calf = Object.keys(data).map(key => data[key]);
          for(let i = 0 ; i<calf.length;i++){
            calf[i].cattle_id = calf[i].birth_id;
          }
          this.damList = calf;
          this.loadedDamList = calf;
        }
        else {
          calf = [];
        }
        this.damList = calf;
        this.loadedDamList = calf;
      })
    }

    this.sub_type = ['เพศผู้','เพศเมีย'];

  }
  showdetail(n){
    if(this.search_type == 'พ่อพันธุ์/แม่พันธุ์'){
      this.navCtrl.push("EditdetailcattlePage",{user:this.user,id:n});
    } else {
      this.navCtrl.push("EditdetailcalfPage",{user:this.user,id:n});
    }

  }
  initializeItems(): void {
    this.damList = this.loadedDamList;
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
  if(this.search_type == 'พ่อพันธุ์/แม่พันธุ์'){
  this.damList = this.damList.filter((v) => {
    if(v.cattle_id && q) {
      if (v.cattle_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
} else if(this.search_type == 'ลูกโค'){
  this.damList = this.damList.filter((v) => {
    if(v.birth_id && q) {
      if (v.birth_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}
  console.log(q, this.damList.length);

}

selectType(n){
  this.damList = [];
  console.log(this.sub_head);
  if(this.sub_head == '0'){
    if(n == 'ทั้งหมด'){
      this.damList = this.loadedDamList;
    }else {
      if(n=='เพศผู้'){
        this.loadedDamList.forEach(d=>{
          if(d.sex == 'BULL'){
            this.damList.push(d);
          }
        })
      } else {
        this.loadedDamList.forEach(d=>{
          if(d.sex == 'MISS'){
            this.damList.push(d);
          }
        })
      }

    }
  } else if(this.sub_head == '1'){
    if(n == 'ทั้งหมด'){
      this.damList = this.loadedDamList;
    }else {
      this.loadedDamList.forEach(d=>{
        if(d.breed == n){
          this.damList.push(d);
        }
      })
    }
  } else if(this.sub_head == '2'){
    if(n == 'ทั้งหมด'){
      this.damList = this.loadedDamList;
    }else {
      this.loadedDamList.forEach(d=>{
        if(d.color == n){
          this.damList.push(d);
        }
      })
    }
  } else if(this.sub_head == '3'){
    if(n == 'ทั้งหมด'){
      this.damList = this.loadedDamList;
    }else {
      this.loadedDamList.forEach(d=>{
        if(d.corral == n){
          this.damList.push(d);
        }
      })
    }
  }
}




selectsex(n){
  this.sub_head = n;
  this.select_sub_type ='ทั้งหมด';
  if(n == '0'){
    this.sub_type = ['เพศผู้','เพศเมีย'];
  } else if(n == '1'){
    this.sub_type = this.breeds;
  } if(n == '2'){
    this.sub_type = this.colors;
  } if(n == '3'){
    this.sub_type = this.corrals;
  }
  this.sub_head = n;
  this.damList = this.loadedDamList;
}

filterType(){
  let alert = this.alertCtrl.create();
    alert.setTitle('ประเภทการค้นหา');
    if(this.search_type == 'พ่อพันธุ์/แม่พันธุ์'){
      alert.addInput({
        type: 'radio',
        label: 'พ่อพันธุ์/แม่พันธุ์',
        value: '0',
        checked: true
      });
      alert.addInput({
        type: 'radio',
        label: 'ลูกโค',
        value: '1',

      });
    } else {
      alert.addInput({
        type: 'radio',
        label: 'พ่อพันธุ์/แม่พันธุ์',
        value: '0',
      });
      alert.addInput({
        type: 'radio',
        label: 'ลูกโค',
        value: '1',
        checked: true
      });
    }



    alert.addButton('ยกเลิก');
    alert.addButton({
      text: 'ตกลง',
      handler: data => {
       if (data==0){
        this.search_type = 'พ่อพันธุ์/แม่พันธุ์';
       } else if(data == 1){
        this.search_type = 'ลูกโค';
       }
       this.sub_head = '0';
       this.editpage();
      }
    });
    alert.present();
  }


//-------------------------------add page------------------

addCattle(){
  var d=new Date();

  this.user=this.navParams.get('user');
  console.log(this.user);
  this.api.getUser(this.user).subscribe(data=>{
    if(data!=null){
      var value = Object.keys(data).map(key => data[key]);
    this.owner = value[0].fname+' '+value[0].lname;
    }

  });
  this.test=d.getFullYear()+"-"+month_of_the_year(d)+"-"+day_of_the_month(d);
  function day_of_the_month(d)
  {
    return (d.getDate() < 10 ? '0' : '') + d.getDate();
  }
  function month_of_the_year(d)
  {
    return ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1);
  }
  this.api.getCorral(this.user).subscribe(data=>{
    if(data!=null){
      this.corral = Object.keys(data).map(key => data[key]);
    }
  });

  this.api.getBreed(this.user).subscribe(data=>{
    if(data!=null){
      this.strian = Object.keys(data).map(key => data[key]);
    }
  });

  this.api.getColor(this.user).subscribe(data=>{
    if(data!=null){
      this.color = Object.keys(data).map(key => data[key]);
    }
  });
  this.api.showHerdNumber(this.user).subscribe(data=>{
    this.herd_num = Object.keys(data).map(key=>data[key]);
  })
}

addc(data:NgForm){
  console.log(this.checkcattle);
  let c =0;
  if(this.checkcattle.length!=0){
    for(let i = 0; i<this.checkcattle.length;i++){
      if(data.value.cattle_id == this.checkcattle[i].cattle_id){
        c ++ ;
      }
      else {
        c = c;
      }
    }
  }
  if(c==0||this.checkcattle.length==0){
  console.log(data.value);
  if(data.value.birth_chest_head_ratio==""||data.value.birth_date==""||data.value.birth_weight==""||data.value.breed==""||data.value.breed_method==""||data.value.breeder==""||data.value.cattle_id==""||data.value.color==""||data.value.corral==""||data.value.dam_id==""||data.value.herd_no==""||data.value.sex==""||data.value.sire_id==""
  ||data.value.waen_weight==""||data.value.wean_chest_head_ratio==""||data.value.year_hip_hight==""||data.value.year_weight=="")
  {
    swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
  }
  else{
    const confirm1 = this.alertCtrl.create({
      title: 'บันทึกข้อมูล',
      message: 'ยืนยันการบันทึกข้อมูล',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'บันทึก',
          handler: () => {
            this.api.addCattle(this.user,data.value).subscribe(d=>{
              if(d.status=='OK'){
                this.success();
                this.viewCtrl.dismiss();
              }
            });

          }
        }
      ]
    });
    confirm1.present();
  }
}else {
  swal("ผิดพลาด!", "มีรหัสโคนี้อยู่แล้ว", "error");
}
}
success(){
  swal("เสร็จสิ้น!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
}
}
