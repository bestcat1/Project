import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController,
    private api: NodeapiProvider) {
    this.user=this.navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MncalfPage');
  }


  selectType(t){
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

  this.damList = this.damList.filter((v) => {
    if(v.birth_id && q) {
      if (v.birth_id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
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
    })
  }
}
