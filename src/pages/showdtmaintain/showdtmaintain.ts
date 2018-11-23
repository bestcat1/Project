import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
/**
 * Generated class for the ShowdtmaintainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showdtmaintain',
  templateUrl: 'showdtmaintain.html',
})
export class ShowdtmaintainPage {

  user;
 program;
 maintain;
d:any;
operator=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api:NodeapiProvider) {
    this.user=this.navParams.get('user');
    this.d=this.navParams.get('key');;
    this.api.getMaintainByKey(this.user,this.d.key).subscribe(data=>{
      console.log(data);
      if(data!=null){
      var values = Object.keys(data).map(key=>data[key]);

        this.api.getDrugProMain(this.user,values[0].type_of_maintain).subscribe(datas =>{
          if(datas!=null){
            var value = Object.keys(datas).map(key => datas[key]);
            this.program = value;
          }
          else{
            this.program = [];
          }

        })
      }
    })


    this.api.getUser(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      this.operator.push({operator: values[0].fname+' '+values[0].lname});
      }
    });

    this.api.getPersonnel(this.user).subscribe(data=>{
      if(data!=null){
      var values = Object.keys(data).map(key => data[key]);
      for(let i = 0; i<values.length;i++){
        this.operator.push({operator: values[i].fname+' '+values[i].lname});
      }
    }
    });

    this.api.getFarm('program_maintain', this.user).subscribe(data => {
      if(data!=null){
      this.maintain = Object.keys(data).map(key => data[key]);
      }
    });


  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowdtmaintainPage');
  }
mt(data:NgForm){
  console.log(data.value);
  this.api.updateMaintainByKey(this.user,this.d.key,data.value).subscribe();
}
select(a)
{
  this.api.getDrugProMain(this.user,a).subscribe(datas =>{
    if(datas!=null){
      var value = Object.keys(datas).map(key => datas[key]);
      this.program = value;
    }
    else{
      this.program = [];
    }

  })
}
}
