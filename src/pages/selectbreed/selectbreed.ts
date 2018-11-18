import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the SelectbreedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectbreed',
  templateUrl: 'selectbreed.html',
})
export class SelectbreedPage {
  corrals:any;
  public damList: Array<any>;
  public loadeddamList: Array<any>;
  public damRef: firebase.database.Reference;
  user: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.api.getCorral(this.user).subscribe(data=>{
      this.corrals = Object.keys(data).map(key => data[key]);
    })


    this.api.getAllCattle(this.user).subscribe(data=>{
      let dam = [];
      var values = Object.keys(data).map(key=>data[key]);
      for(let i = 0; i<values.length; i++){
        if (values[i].sexct == "เพศเมีย" && (values[i].status == 'เหนี่ยวนำแล้ว' || values[i].status == 'บำรุงแล้ว')){
          dam.push(values[i]);
        }
      }
      this.damList = dam;
      this.loadeddamList = dam;
    })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectbreedPage');
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
      if (v.id && q) {
        if (v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.damList.length);
  }
  breed(k) {
    this.navCtrl.push('BreedPage', { user: this.user, id: k })
  }
  corralbreed() {
    this.navCtrl.push("CorralbreedingPage", { user: this.user });
  }
  selectcorral(n) {
    if(n=='ทั้งหมด'){
      this.api.getAllCattle(this.user).subscribe(data=>{
        let dam = [];
        var values = Object.keys(data).map(key=>data[key]);
        for(let i = 0; i<values.length; i++){
          if (values[i].sexct == "เพศเมีย" && (values[i].status == 'เหนี่ยวนำแล้ว' || values[i].status == 'บำรุงแล้ว')){
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
          if (values[i].sexct == "เพศเมีย" && (values[i].status == 'เหนี่ยวนำแล้ว' || values[i].status == 'บำรุงแล้ว')){
            dam.push(values[i]);
          }
        }
        this.damList = dam;
        this.loadeddamList = dam;
      })
    }
  }
}
