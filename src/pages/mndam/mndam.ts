import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the MndamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mndam',
  templateUrl: 'mndam.html',
})
export class MndamPage {
  user:string;
  public damList:Array<any>;
  public loadeddamList:Array<any>;
type:any;
sub_type = [];
corral = [];
breed = [];
herd_num = [];
a= 'ทั้งหมด';
head='คอก';
head_type;
datas:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.api.getCorral(this.user).subscribe(d=>{
      Object.keys(d).map(key=>d[key]).forEach(d1=>{
        this.corral.push(d1.corral);
      })
      console.log(d);
    })
    this.api.getBreed(this.user).subscribe(d=>{
      Object.keys(d).map(key=>d[key]).forEach(d1=>{
        this.breed.push(d1.strian);
      })
      console.log(d);
    })
    this.api.showHerdNumber(this.user).subscribe(d=>{
      Object.keys(d).map(key=>d[key]).forEach(d1=>{
        this.herd_num.push(d1.herd_num);
      })
      console.log(d);
    })
  }
  ionViewWillEnter(){
    this.test(this.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MndamPage');
  }
  test(t){
    this.head='0'
    this.a= 'ทั้งหมด'
    console.log(t);
    if(t == 'บันทึกการบำรุง'){
      this.type = t;
      this.showmaintain();
    }
    if(t == 'บันทึกการเหนี่ยวนำ'){
      this.type = t;
      this.showsync();
    }
    if(t == 'บันทึกการผสมพันธุ์'){
      this.type = t;
      this.showbreeding();
    }
    if(t == 'บันทึกการตรวจท้อง'){
      this.type = t;
      this.showpregnant();
    }
    if(t == 'บันทึกการคลอด'){
      this.type = t;
      this.showcalve();
    }
    if(t == 'บันทึกการโคแท้ง'){
      this.type = t;
      this.showabortion();
    }

  }
  showdetail(id){
    if(this.type == 'บันทึกการบำรุง'){
        this.navCtrl.push("MaintainPage",{user: this.user,id:id});
    }
    if(this.type == 'บันทึกการเหนี่ยวนำ'){
      this.navCtrl.push('SynchronizePage',{user:this.user,id:id});
    }
    if(this.type == 'บันทึกการผสมพันธุ์'){
      this.navCtrl.push('BreedPage',{user:this.user, id:id} );
    }
    if(this.type == 'บันทึกการตรวจท้อง'){
      this.navCtrl.push('AbdominalPage',{user:this.user,id:id});
    }
    if(this.type == 'บันทึกการคลอด'){
      this.navCtrl.push('DeliveryPage',{user:this.user,id:id});
    }
    if(this.type == 'บันทึกการโคแท้ง'){
      this.navCtrl.push('AbortionPage',{user:this.user,id:id})
    }
  }

  clickcorral(){
    if(this.type == 'บันทึกการบำรุง'){
      this.navCtrl.push("CorralmaintainPage",{user:this.user});
  }
  if(this.type == 'บันทึกการเหนี่ยวนำ'){
    this.navCtrl.push("CorralsyncPage",{user:this.user});
  }
  if(this.type == 'บันทึกการผสมพันธุ์'){
    this.navCtrl.push("CorralbreedingPage", { user: this.user });
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

  this.damList = this.damList.filter((v) => {
    if(v.cattle_id && q) {
      if (v.cattle_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.damList.length);
  }

  showmaintain(){
    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        if(values[i].sex=="MISS"&&(values[i].status==""||values[i].status=="คลอดแล้ว"||values[i].status=="โคแท้ง"||values[i].status=="ไม่ท้อง")){
          dam.push(values[i]);
        }
      }
    }
    else {
      dam = [];
    }
    this.damList = dam;
    this.loadeddamList = dam;
    this.datas = dam;
    });

  }
  showsync(){
    this.api.getAllCattle(this.user).subscribe(data=>{
      var dam = [];
      if(data!=null){
        var values = Object.keys(data).map(key => data[key]);
        for(let i = 0; i<values.length; i++){
          if(values[i].sex=="MISS"&&values[i].status=="บำรุงแล้ว"){
            dam.push(values[i]);
         }
        }
      }
      else{
        dam = [];
      }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    })
  }
  showbreeding(){
    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        if (values[i].sex == "MISS" && (values[i].status == 'เหนี่ยวนำแล้ว' || values[i].status == 'บำรุงแล้ว')){
          dam.push(values[i]);
        }
      }
    }
    else {
      dam =[];
    }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    })
  }
  showpregnant(){
    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      if(data!=null){


      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        if(snap.sex=="MISS"&&snap.status=='ผสมพันธุ์แล้ว'){
          dam.push(snap);
       }
      })
    }
    else
    {
      dam = [];
    }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    })
  }

  showcalve(){
    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      values.forEach(snap=>{
        if(snap.sex=="MISS"&&snap.status=="ตรวจท้องแล้ว"){
          dam.push(snap);
       }
      })
    }
    else{
      dam=[];
    }
      this.damList = dam;
      this.loadeddamList = dam;
      this.datas = dam;
    })
  }
  showabortion(){
    this.api.getAllCattle(this.user).subscribe(data=>{
      var values = Object.keys(data).map(key=>data[key]);
     let dam = [];
    if(data!=null){
     values.forEach(snap=>{
      if(snap.sex=="MISS"&&snap.status=='ตรวจท้องแล้ว'){
        dam.push(snap);
     }
     })
    }
    else{
      dam=[];
    }
     this.damList = dam;
     this.loadeddamList = dam;
     this.datas = dam;
    })
  }
  headsearch(h){
    this.head_type = h;
    this.sub_type = [];
    console.log(h)
    if(h == 0){
      this.sub_type = this.corral;
    } else if(h == 1) {
      this.sub_type = this.breed;
    } else if( h == 2){
      this.sub_type = this.herd_num;
    }
    this.a= 'ทั้งหมด'
  }

  subsearch(s){

    if(s == 'ทั้งหมด'){
      this.damList = this.datas;
      this.loadeddamList = this.datas;
    }
    else{
    this.damList = []
    this.loadeddamList = [];
    if(this.head_type == 0){
      this.datas.forEach(d=>{
        if(d.corral == s){
          this.damList.push(d);
          this.loadeddamList.push(d);
        }
      })
    }
    else if(this.head_type == 1){
      this.datas.forEach(d=>{
        if(d.breed == s){
          this.damList.push(d);
          this.loadeddamList.push(d);
        }
      })
    }
    else if(this.head_type == 2){
      this.datas.forEach(d=>{
        if(d.herd_no == s){
          this.damList.push(d);
          this.loadeddamList.push(d);
        }
      })
    }
  }
}
}
