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
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');

  }
  ionViewWillEnter(){
    this.test(this.type);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MndamPage');
  }
  test(t){
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
      console.log(data);
      let dam = [];
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        console.log(values[i].status);
        if(values[i].sex=="MISS"&&values[i].status==""||values[i].status=="คลอดแล้ว"||values[i].status=="โคแท้ง"){
          console.log(values[i]);
          dam.push(values[i]);
        }
      }
    }
    else {
      dam = [];
    }
    this.damList = dam;
    this.loadeddamList = dam;
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
    })
  }
}
