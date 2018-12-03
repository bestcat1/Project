import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';

import { NodeapiProvider } from '../../providers/nodeapi/nodeapi';
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
  data_cattle = [];
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  name = '';
  pdfObj = null;
  data_user: Observable<any[]>;
  brand_user: Observable<any[]>;
  myPhotoURL = [];
  data = [];
  loader;
  pdfimage;


  //==============
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private plt: Platform, private file: File
    , private fileOpener: FileOpener, private loadingCtrl: LoadingController,
    private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.mncattle = "verify";

    this.indexreport();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage', { user: this.user });
  }
  showmt() {
    this.navCtrl.push("ShowmaintainPage", { user: this.user });
  }
  showcattle() {
    this.navCtrl.push("ShowcattlePage", { user: this.user });
  }
  showabd() {
    this.navCtrl.push("ShowabdominalPage", { user: this.user });
  }
  showbdc() {
    this.navCtrl.push("ShowBrandingcalfPage", { user: this.user });
  }
  showdrv() {
    this.navCtrl.push("ShowdeliveryPage", { user: this.user });
  }
  showdhc() {
    this.navCtrl.push("ShowDishorncalfPage", { user: this.user });
  }
  shownt() {
    this.navCtrl.push("ShownurturePage", { user: this.user });
  }
  showwc() {
    this.navCtrl.push("ShowWeancalfPage", { user: this.user });
  }
  showsyc() {
    this.navCtrl.push("ShowsynchronizePage", { user: this.user });
  }
  showbreed() {
    this.navCtrl.push("ShowbreedPage", { user: this.user });
  }
  showabortion(){
    this.navCtrl.push("ShowabortionPage", { user: this.user });
  }

  // ============================================

  indexreport() {
    this.api.getUser(this.user).subscribe(data=>{
      var value = Object.keys(data).map(key=>data[key]);
      this.data = value;
    })
    this.api.getPicLogoFromStorage(this.user).subscribe(data=>{
      console.log(data);
      var value = Object.keys(data).map(key=>data[key]);
      this.myPhotoURL  = value;
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
  typereport(a) {
    console.log(a);
    this.data_cattle = [];
    this.name = a;
    if(a == 'cattle'){
      this.api.getAllCattle(this.user).subscribe(data=>{
        if(data!=null){
       this.data_cattle = Object.keys(data).map(key=>data[key]);
    } else {
      this.data_cattle = [];
    }
  })
    } else if(a == 'maintain') {
      this.api.getMaintainByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);

       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'synchronize') {
      this.api.getSyncByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'breed') {
      this.api.getBreedByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'abdominal') {
      this.api.getPregnantByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'delivery') {
      this.api.getDeliveryByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'abortion') {
      this.api.getAbortionByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'nurture') {
      this.api.getTreatmentByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'dishorn') {
      this.api.getHorndeteringByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    } else if(a == 'branding') {
      this.api.getBrandingByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    }  else if(a == 'wean') {
      this.api.getWeanByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
       } else {
         this.data_cattle = [];
       }
       console.log(this.data_cattle)
      })
    }

  }
  createPdf() {

    this.presentLoading();
    this.api.getPicLogoFromStorage(this.user).subscribe(snap => {
      var value = Object.keys(snap).map(key => snap[key]);
      var data = value[0].logo_base64;

      function convertToDataURLviaCanvas(url, outputFormat) {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
              ctx = canvas.getContext('2d'),
              dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            resolve(dataURL);
            canvas = null;
          };
          img.src = url;
        });
      }
      convertToDataURLviaCanvas(data, "image/png").then(base64 => this.pdfimage = base64)
    })
    var d = new Date();
    setTimeout(() => {
// -----------------------------------------------------------------------------
      if(this.name == 'cattle'){
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
                text: [
                  { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
                  { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
                  { text: 'รายงานข้อมูลโคทั้งหมด', style: 'subheader', alignment: 'center' }
                ],
              },
              {
                text: d.toDateString(), alignment: 'right', width: 50
              }
            ]
          }, {
            text: '\n\n',
          },
          this.table(this.data_cattle, ['cattle_id', 'sex', 'birth_date', 'breed', 'color', 'dam_id', 'sire_id']),
          {
            text: '\n\n\n'
          },
          {
            columns: [
              { text: '' },
              {
                text: [
                  { text: '...............................\n', alignment: 'center' },
                  { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
                  { text: 'ผู้ดูแลระบบ', alignment: 'center' }
                ], width: 200, style: 'story'
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
// -----------------------------------------------------------------------------
    } else if(this.name == 'maintain'){
       docDefinition = {
        content: [
          {
            columns: [
              {
                image: this.pdfimage,
                width: 50,
                height: 50,
              },
              {
                text: [
                  { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
                  { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
                  { text: 'รายงานข้อมูลการบำรุง', style: 'subheader', alignment: 'center' }
                ],
              },
              {
                text: d.toDateString(), alignment: 'right', width: 50
              }
            ]
          }, {
            text: '\n\n',
          },
          this.table(this.data_cattle, ['dam_id', 'type_of_maintain', 'date', 'time', 'operator', 'recoder']),          {
            text: '\n\n\n'
          },
          {
            columns: [
              { text: '' },
              {
                text: [
                  { text: '...............................\n', alignment: 'center' },
                  { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
                  { text: 'ผู้ดูแลระบบ', alignment: 'center' }
                ], width: 200, style: 'story'
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
    }else if(this.name == 'synchronize'){
      docDefinition = {
       content: [
         {
           columns: [
             {
               image: this.pdfimage,
               width: 50,
               height: 50,
             },
             {
               text: [
                 { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
                 { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
                 { text: 'รายงานข้อมูลเหนี่ยวนำ', style: 'subheader', alignment: 'center' }
               ],
             },
             {
               text: d.toDateString(), alignment: 'right', width: 50
             }
           ]
         }, {
           text: '\n\n',
         },
         this.table(this.data_cattle, ['dam_id', 'program_sync', 'date', 'operator', 'recoder']),          {
           text: '\n\n\n'
         },
         {
           columns: [
             { text: '' },
             {
               text: [
                 { text: '...............................\n', alignment: 'center' },
                 { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
                 { text: 'ผู้ดูแลระบบ', alignment: 'center' }
               ], width: 200, style: 'story'
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
   }
// -----------------------------------------------------------------------------
   else if(this.name == 'breed'){
    docDefinition = {
     content: [
       {
         columns: [
           {
             image: this.pdfimage,
             width: 50,
             height: 50,
           },
           {
             text: [
               { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
               { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
               { text: 'รายงานข้อมูลการผสมพันธุ์', style: 'subheader', alignment: 'center' }
             ],
           },
           {
             text: d.toDateString(), alignment: 'right', width: 50
           }
         ]
       }, {
         text: '\n\n',
       },
       this.table(this.data_cattle, ['dam_id', 'sire_id','number_of_breeding', 'date_breeding', 'time_breeding', 'operator', 'recoder']),          {
         text: '\n\n\n'
       },
       {
         columns: [
           { text: '' },
           {
             text: [
               { text: '...............................\n', alignment: 'center' },
               { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
               { text: 'ผู้ดูแลระบบ', alignment: 'center' }
             ], width: 200, style: 'story'
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
 }
 // -----------------------------------------------------------------------------
 else if(this.name == 'abdominal'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลการตรวจท้อง', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['dam_id', 'dateabd', 'timeabd','result', 'operator', 'recoder']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
 // -----------------------------------------------------------------------------
 else if(this.name == 'delivery'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลคลอด', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['dam_id', 'sire_id', 'date','count_calf', 'operator', 'recoder']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
 // -----------------------------------------------------------------------------
 else if(this.name == 'abortion'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลโคแท้ง', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['dam_id', 'date_breeding', 'operator','recoder', 'note']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
 // -----------------------------------------------------------------------------
 else if(this.name == 'nurture'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลการรักษา', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['id', 'number_of_treatment','datediagnose', 'timediagnose', 'sickness', 'operator', 'recoder']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
 // -----------------------------------------------------------------------------
 else if(this.name == 'dishorn'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลการสูญเขา', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['birth_id', 'dam_id','datedishorn', 'method', 'operator', 'recoder']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
 // -----------------------------------------------------------------------------
 else if(this.name == 'branding'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลการตีเบอร์', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['birth_id', 'dam_id','wid', 'datebran', 'operator', 'recoder']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
// -----------------------------------------------------------------------------
else if(this.name == 'wean'){
  docDefinition = {
   content: [
     {
       columns: [
         {
           image: this.pdfimage,
           width: 50,
           height: 50,
         },
         {
           text: [
             { text: this.myPhotoURL[0].farm_name_TH + ' (' + this.myPhotoURL[0].farm_name_EN + ')', style: 'header', alignment: 'center', width: '*' },
             { text: '\n' + this.myPhotoURL[0].farm_address + '\n', alignment: 'center' },
             { text: 'รายงานข้อมูลการตีเบอร์', style: 'subheader', alignment: 'center' }
           ],
         },
         {
           text: d.toDateString(), alignment: 'right', width: 50
         }
       ]
     }, {
       text: '\n\n',
     },
     this.table(this.data_cattle, ['birth_id', 'dam_id','weanweight', 'datewean', 'operator', 'recoder']),          {
       text: '\n\n\n'
     },
     {
       columns: [
         { text: '' },
         {
           text: [
             { text: '...............................\n', alignment: 'center' },
             { text: '(' + this.data[0].fname + ' ' + this.data[0].lname + ')\n', alignment: 'center' },
             { text: 'ผู้ดูแลระบบ', alignment: 'center' }
           ], width: 200, style: 'story'
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
}
 // -----------------------------------------------------------------------------
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
    console.log('asasasas',data,columns);
    var body = [];
    if(this.name == 'cattle'){
      body.push(['รหัสโค', 'เพศ', 'วัน/เดือน/ปี เกิด', 'สายพันธุ์', 'สี', 'รหัสแม่', 'รหัสพ่อ']);
    } else if(this.name == 'maintain'){
      body.push(['รหัสโค', 'ประเภทการบำรุง', 'วัน/เดือน/ปี', 'เวลา', 'ผู้ปฏิบัติการ', 'ผู้บันทึก']);
    } else if(this.name == 'synchronize'){
      body.push(['รหัสโค', 'ประเภทการเหนี่ยวนำ', 'วัน/เดือน/ปี', 'ผู้ปฏิบัติการ', 'ผู้บันทึก']);
    } else if(this.name == 'breed'){
      body.push(['รหัสแม่พันธุ์', 'รหัสพ่อพันธุ์','ครั้ง', 'วันที่ผสมพันธุ์', 'เวลา', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    } else if(this.name == 'abdominal'){
      body.push(['รหัสแม่พันธุ์', 'วัน/เดือน/ปี','เวลา', 'ผลการตรวจ', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    } else if(this.name == 'delivery'){
      body.push(['รหัสแม่พันธุ์', 'รหัสพ่อพันธุ์','วัน/เดือน/ปี', 'จำนวนลูก', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    } else if(this.name == 'abortion'){
      body.push(['รหัสแม่พันธุ์', 'วันที่ผสมพันธุ์', 'ผู้ปฏิบัติการ','ผู้บันทึก','หมายเหตุ']);
    } else if(this.name == 'nurture'){
      body.push(['รหัสโค','ครั้งที่', 'วัน/เดือน/ปี','เวลา','อาการ', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    } else if(this.name == 'dishorn'){
      body.push(['เบอร์แรกเกิด','รหัสแม่พันธุ์', 'วัน/เดือน/ปี','วิธีการ', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    } else if(this.name == 'branding'){
      body.push(['เบอร์แรกเกิด','รหัสแม่พันธุ์','เบอร์ที่ต้องการตี', 'วัน/เดือน/ปี', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    }
    else if(this.name == 'wean'){
      body.push(['เบอร์แรกเกิด','รหัสแม่พันธุ์','น้ำหนักแรกเกิด(กก.)', 'วัน/เดือน/ปี', 'ผู้ปฏิบัติการ','ผู้บันทึก']);
    }
    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })
      body.push(dataRow);
    });

    return body;
  }
  table(data, columns) {
    if(this.name == 'cattle'){
      return {
        table: {
          headerRows: 1,
          widths: ['*', '*', 100, '*', 50, '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'maintain'){
      return {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', '*', '*', 'auto', 'auto'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'synchronize'){
      return {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'breed'){
      return {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'abdominal'){
      return {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'delivery'){
      return {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'abortion'){
      return {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', '*', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'nurture'){
      return {
        table: {
          headerRows: 1,
          widths: ['auto','auto','auto', 'auto', '*', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'dishorn'){
      return {
        table: {
          headerRows: 1,
          widths: ['auto','auto','auto', '*', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'branding'){
      return {
        table: {
          headerRows: 1,
          widths: ['auto','auto','auto', '*', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    } else if(this.name == 'wean'){
      return {
        table: {
          headerRows: 1,
          widths: ['auto','auto','auto', '*', '*', '*'],
          body: this.buildTableBody(data, columns),
        }, style: 'story', alignment: 'center'
      };
    }


  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่...",
    });
    this.loader.present();

  }
}
