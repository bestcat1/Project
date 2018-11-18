import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the SelectabortionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectabortion',
  templateUrl: 'selectabortion.html',
})
export class SelectabortionPage {
  public damList:Array<any>;
  public loadeddamList:Array<any>;
  user:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.api.getAllCattle(this.user).subscribe(data=>{
      var values = Object.keys(data).map(key=>data[key]);
     let dam = [];
     values.forEach(snap=>{
      if(snap.sexct=="เพศเมีย"&&snap.status=='ตรวจท้องแล้ว'){
        dam.push(snap);
     }
     })
     this.damList = dam;
     this.loadeddamList = dam;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectabortionPage');
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
  abd(k){
    this.navCtrl.push('AbortionPage',{user:this.user,id:k})
  }

}
