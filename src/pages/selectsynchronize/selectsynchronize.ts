import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the SelectsynchronizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectsynchronize',
  templateUrl: 'selectsynchronize.html',
})
export class SelectsynchronizePage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  public damRef:firebase.database.Reference;
  user:string;
  corrals:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: NodeapiProvider) {
    this.user=this.navParams.get('user');

    this.api.getAllCattle(this.user).subscribe(data=>{
      var dam = [];
      if(data!=null){
        var values = Object.keys(data).map(key => data[key]);
        for(let i = 0; i<values.length; i++){
          if(values[i].sexct=="เพศเมีย"&&values[i].status=="บำรุงแล้ว"){
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

    this.api.getCorral(this.user).subscribe(data=>{
      this.corrals = Object.keys(data).map(key=>data[key]);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectsynchronizePage');
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
  sync(k){
    this.navCtrl.push('SynchronizePage',{user:this.user,id:k})
  }
  selectcorral(n){
    console.log(n)
    if(n=='ทั้งหมด'){
      this.api.getAllCattle(this.user).subscribe(data=>{
        var dam = [];
        if(data!=null){
          var values = Object.keys(data).map(key => data[key]);
          for(let i = 0; i<values.length; i++){
            if(values[i].sexct=="เพศเมีย"&&values[i].status=="บำรุงแล้ว"){
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
    else{
      this.api.getCattleByCorral(this.user, n).subscribe(data=>{
        var dam = [];
        if(data!=null){
          var values = Object.keys(data).map(key => data[key]);
          for(let i = 0; i<values.length; i++){
            if(values[i].sexct=="เพศเมีย"&&values[i].status=="บำรุงแล้ว"){
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

  }
  corralsync(){
    this.navCtrl.push("CorralsyncPage",{user:this.user});
  }
}
