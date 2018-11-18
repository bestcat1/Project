import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';

/**
 * Generated class for the SelectmaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectmaintain',
  templateUrl: 'selectmaintain.html',
})
export class SelectmaintainPage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  public damRef:firebase.database.Reference;
  user:string;
  corrals:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.api.getCorral(this.user).subscribe(data=>{
      this.corrals = Object.keys(data).map(key => data[key]);
    })

    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        if(values[i].sexct=="เพศเมีย"&&(values[i].status==""||values[i].status=="คลอดแล้ว"||values[i].status=="โคแท้ง")){
          dam.push(values[i]);
        }
      }
      this.damList = dam;
      this.loadeddamList = dam;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectmaintainPage');
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
    if(v.id && q) {
      if (v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  console.log(q, this.damList.length);

}
maintain(n){
  this.navCtrl.push("MaintainPage",{user: this.user,id:n})
}
selectcorral(n){
  if(n=='ทั้งหมด'){
    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        if(values[i].sexct=="เพศเมีย"&&(values[i].status==""||values[i].status=="คลอดแล้ว"||values[i].status=="โคแท้ง")){
          dam.push(values[i]);
        }
      }
      this.damList = dam;
      this.loadeddamList = dam;
    });
  }
  else{
    this.api.getCattleByCorral(this.user, n).subscribe(data=>{
      let dam = [];
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        if(values[i].sexct=="เพศเมีย"&&(values[i].status==""||values[i].status=="คลอดแล้ว"||values[i].status=="โคแท้ง")){
          dam.push(values[i]);
        }
      }
      this.damList = dam;
      this.loadeddamList = dam;
    })
  }
}
corralmaintain(){
  this.navCtrl.push("CorralmaintainPage",{user:this.user});
}
}
