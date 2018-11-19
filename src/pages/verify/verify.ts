import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  mncattle;
  user;
  downloadedImg;
  //==============
  externalDataRetrievedFromServer = [
    { name: 'Bartek', age: 34 },
    { name: 'John', age: 27 },
    { name: 'Elizabeth', age: 30 },
]
  data_cattle=[];
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 name='';
  pdfObj = null;
  data_user:Observable<any[]>;
  brand_user:Observable<any[]>;
  myPhotoURL=[];
  data=[];
  loader;
  pdfimage;
  //==============
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db:AngularFireDatabase
    ,private plt: Platform, private file: File
    , private fileOpener: FileOpener, private loadingCtrl: LoadingController) {
    this.user=this.navParams.get('user');
    this.mncattle="verify";
    this.indexreport();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage',{user:this.user});
  }
  showmt(){
    this.navCtrl.push("ShowmaintainPage",{user:this.user});
  }
  showcattle()
  {
    this.navCtrl.push("ShowcattlePage",{user:this.user});
  }
  showabd(){
    this.navCtrl.push("ShowabdominalPage",{user:this.user});
  }
  showbdc(){
    this.navCtrl.push("ShowBrandingcalfPage",{user:this.user});
  }
  showdrv(){
    this.navCtrl.push("ShowdeliveryPage",{user:this.user});
  }
  showdhc(){
    this.navCtrl.push("ShowDishorncalfPage",{user:this.user});
  }
  shownt(){
    this.navCtrl.push("ShownurturePage",{user:this.user});
  }
  showwc(){
    this.navCtrl.push("ShowWeancalfPage",{user:this.user});
  }
  showsyc(){
    this.navCtrl.push("ShowsynchronizePage",{user:this.user});
  }
  showbreed(){
    this.navCtrl.push("ShowbreedPage",{user:this.user});
  }

  // ============================================

  indexreport(){
    this.data_user=this.db.list('/User',ref=>ref.orderByChild('user').equalTo(this.user)).valueChanges();
    this.data_user.forEach(data=>{
      data.forEach(element=>{
       this.data.push(element);
      })
    })
    this.brand_user=this.db.list('/setting/farm/brand/'+this.user).valueChanges();
    this.brand_user.forEach(data=>{
      data.forEach(element=>{
        this.myPhotoURL.push(element);
      })
    })
    pdfMake.fonts = {
      'TH Niramit AS': {
           normal: 'TH Niramit AS.ttf',
           bold: 'TH Niramit AS Bold.ttf',
           italics: 'TH Niramit AS Italic.ttf',
           bolditalics: 'TH Niramit AS Bold Italic.ttf.ttf'
     }
    }
  }
  typereport(a){
    this.data_cattle=[];
    var test;
    this.name=a;
    test=this.db.list('/cattle/admin').valueChanges();
    test.forEach(data=>{
      data.forEach(element=>{
        this.data_cattle.push(element);
      });
    });
  }
  createPdf() {
    this.presentLoading();
    async function getBase64ImageFromUrl(imageUrl) {
      var res = await fetch(imageUrl);
      var blob = await res.blob();

      return new Promise((resolve, reject) => {
        var reader  = new FileReader();
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        reader.onerror = () => {
          return reject(this);
        };
        reader.readAsDataURL(blob);
      })
    }

    getBase64ImageFromUrl(this.myPhotoURL[0].logo_base64)
    .then(result => this.pdfimage = result)
    .catch(err => console.error(err));


    setTimeout(() => {
      var d = new Date();
    var docDefinition = {
      content: [
        {
        columns: [
          {
           image: this.pdfimage,
            width: 50,
            height: 50,
          },
          {
            text:[
              { text: this.myPhotoURL[0].farm_name_TH+' ('+this.myPhotoURL[0].farm_name_EN+')', style: 'header' , alignment: 'center',width: '*'},
            { text:'\n'+this.myPhotoURL[0].farm_address+'\n', alignment:'center'},
            {text: 'รายงาน'+this.name, style: 'subheader',alignment:'center'}
            ],
          },
          {
             text: d.toDateString(), alignment: 'right' ,width:50
          }
        ]
      },{
        text:'\n\n',
      },
          this.table(this.data_cattle, ['cattle_id','sex','birth_date','breed','color','dam_id','sire_id']),
      {
        text:'\n\n\n'
      },
      {

        columns:[
          {text:''},
          {
            text: [
              {text:'...............................\n',alignment:'center'},
              { text:'('+this.data[0].fname+' '+this.data[0].lname+')\n',alignment:'center'},
              { text: 'ผู้ดูแลระบบ',alignment:'center'}
            ],width:200,style:'story'
          },
        ]
      }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,

        },
        subheader: {
          fontSize: 18,
          bold: true,

        },
        story: {
          fontSize: 16,
        }
      },
      defaultStyle: {
        font: 'TH Niramit AS'
    }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
    }, 5000);

  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
    this.loader.dismiss();
  }
  buildTableBody(data, columns) {
    var body = [];
    body.push(['รหัสโค','เพศ','วัน/เดือน/ปี เกิด','สายพันธุ์','สี','รหัสแม่','รหัสพ่อ']);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}
table(data, columns) {
  return {
      table: {
          headerRows: 1,
          widths: ['*','*',100,'*',50,'*','*'],
          body: this.buildTableBody(data, columns),
      },style:'story',alignment:'center'
  };
}
presentLoading() {
  this.loader = this.loadingCtrl.create({
    content: "กรุณารอสักครู่...",
  });
  this.loader.present();

}
}
