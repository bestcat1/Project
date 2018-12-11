import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the SelectnurturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectnurture',
  templateUrl: 'selectnurture.html',
})
export class SelectnurturePage {
  type=0;
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  name_type='พ่อโค/แม่โค';
  user:string;
  head = 'แม่โค/พ่อโค';
  a = 'ทั้งหมด';
  sub_type = [];
  clearSearch = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.api.getAllCattle(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);
      let dam = [];
      values.forEach(snap=>{
        dam.push(snap);
      })
      this.damList = dam;
      this.loadeddamList = dam;
    }
    });
    this.api.getBreed(this.user).subscribe(data=>{
      console.log(data);
      var value = Object.keys(data).map(key=>data[key]);
      value.forEach(element=>{
        this.sub_type.push(element.strian);
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectnurturePage');
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
  if(this.type==0){
    if(v.cattle_id && q) {
      if (v.cattle_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  }
  else{
    if(v.birth_id && q) {
      if (v.birth_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  }

  });
  console.log(q, this.damList.length);
  }
  nur(k){
    console.log(k);
    this.navCtrl.push('NurturePage',{user:this.user,id:k})
  }
  selecttype(a){
    this.clearSearch = '';
    console.log(a);
    this.a = 'ทั้งหมด';
    if(a=='แม่โค/พ่อโค')
    {
      this.name_type='พ่อโค/แม่โค'
      this.type=0;
      this.api.getAllCattle(this.user).subscribe(data=>{
        let dam = [];
        if(data!=null){
        var values = Object.keys(data).map(key=>data[key]);

        values.forEach(snap=>{
          dam.push(snap);
        })}
        else{
          dam=[];
        }
        this.damList = dam;
        this.loadeddamList = dam;

      });
    }
    else{
      this.name_type='ลูกโค'
      this.type=1;
      this.api.getAllCalf(this.user).subscribe(data=>{
        let dam = [];
        if(data!=null){
        var values = Object.keys(data).map(key=>data[key]);
        values.forEach(snap=>{
          dam.push(snap);
        })
      }
      else{
          dam = [];
      }
        this.damList = dam;
        this.loadeddamList = dam;

      });
    }
  }
  subsearch(s){
    this.clearSearch = '';
    console.log(s);
    console.log(this.loadeddamList);
    if(s == 'ทั้งหมด'){
      this.damList = this.loadeddamList;
    } else {
    this.damList = [];
    this.loadeddamList.forEach(a=>{
      if(a.breed == s){
        this.damList.push(a);
      }
    })
  }
}
}
