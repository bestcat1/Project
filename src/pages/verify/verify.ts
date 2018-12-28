import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
import * as papa from 'papaparse';
import * as XLSX from 'xlsx';
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
  a = [];
  loader;
  pdfimage;
  csvData: any[] = [];
  headerRow: any[] = [];
  start_date='';
  end_date=''
  head_report=''
  checkTypeReport = true;
  privilege;
  hideverify = 0;
  //==============
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private plt: Platform, private file: File
    , private fileOpener: FileOpener, private loadingCtrl: LoadingController,
    private api: NodeapiProvider) {
    this.user = this.navParams.get('user');
    this.mncattle = "verify";
    this.indexreport();
    this.privilege = this.navParams.get('privilege');
    console.log('privilege: '+this.privilege)
  }

    OnExport = function ()
    {
      this.presentLoading()
      if (this.plt.is('cordova')) {
        let sheet = XLSX.utils.json_to_sheet(this.data_cattle);
        let wb = {
            SheetNames: ["export"],
            Sheets: {
                "export": sheet
            }
        };

        let wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });
        let blob = new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'});
            this.file.writeFile(this.file.dataDirectory, 'export.xlsx', blob, { replace: true }).then(() => {
                this.fileOpener.open(this.file.dataDirectory + 'export.xlsx', 'application/octet-stream').then(() =>{
                  this.loader.dismiss();
                });
              });
        }
        else{
          this.downloadCSV();
          this.loader.dismiss();
        }
    }

   s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
  }
    // downloadPdf() {
    //   if (this.plt.is('cordova')) {
    //     this.pdfObj.getBuffer((buffer) => {
    //       var blob = new Blob([buffer], { type: 'application/pdf' });

    //       // Save the PDF to the data Directory of our App
    //       this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
    //         // Open the PDf with the correct OS tools
    //         this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
    //       })
    //     });
    //   } else {
    //     // On a browser simply use download!
    //     this.pdfObj.download();
    //   }
    //   this.loader.dismiss();
    // }


  downloadCSV() {
    console.log(this.data_cattle);
    console.log('export excel');
    let csv
    if(this.name == 'cattle'){
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['cattle_id', 'sex', 'birth_date', 'breed', 'color', 'dam_id', 'sire_id']),
      });
    } else if(this.name == 'maintain') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['dam_id', 'type_of_maintain', 'date', 'time', 'operator', 'recoder']),
      });
    } else if(this.name == 'synchronize') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['dam_id', 'sire_id','number_of_breeding', 'date_breeding', 'time_breeding', 'operator', 'recoder']),
      });
    } else if(this.name == 'breed') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['dam_id', 'sire_id','number_of_breeding', 'date_breeding', 'time_breeding', 'operator', 'recoder']),
      });
    } else if(this.name == 'abdominal') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle,  ['dam_id', 'dateabd', 'timeabd','result', 'operator', 'recoder']),
      });
    } else if(this.name == 'delivery') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['dam_id', 'sire_id', 'date','count_calf', 'operator', 'recoder']),
      });
    } else if(this.name == 'abortion') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['dam_id', 'date_breeding', 'operator','recoder', 'note']),
      });
    } else if(this.name == 'nurture') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['id', 'number_of_treatment','datediagnose', 'timediagnose', 'sickness', 'operator', 'recoder']),
      });
    } else if(this.name == 'dishorn') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['birth_id', 'dam_id','datedishorn', 'method', 'operator', 'recoder']),
      });
    } else if(this.name == 'branding') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['birth_id', 'dam_id','wid', 'datebran', 'operator', 'recoder']),
      });
    }  else if(this.name == 'wean') {
      csv = papa.unparse({
        fields: null,
        data:  this.buildTableBody(this.data_cattle, ['birth_id', 'dam_id','weanweight', 'datewean', 'operator', 'recoder']),
      });
    }
    // Dummy implementation for Desktop download purpose
    var blob = new Blob(['\uFEFF' + csv], { type: "text/csv;charset=utf-8" });
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage', { user: this.user ,privilege:this.privilege});
  }
  showmt() {
    this.navCtrl.push("ShowmaintainPage", { user: this.user ,privilege:this.privilege});
  }
  showcattle() {
    this.navCtrl.push("ShowcattlePage", { user: this.user ,privilege:this.privilege});
  }
  showabd() {
    this.navCtrl.push("ShowabdominalPage", { user: this.user ,privilege:this.privilege});
  }
  showbdc() {
    this.navCtrl.push("ShowBrandingcalfPage", { user: this.user ,privilege:this.privilege});
  }
  showdrv() {
    this.navCtrl.push("ShowdeliveryPage", { user: this.user ,privilege:this.privilege});
  }
  showdhc() {
    this.navCtrl.push("ShowDishorncalfPage", { user: this.user ,privilege:this.privilege});
  }
  shownt() {
    this.navCtrl.push("ShownurturePage", { user: this.user ,privilege:this.privilege});
  }
  showwc() {
    this.navCtrl.push("ShowWeancalfPage", { user: this.user ,privilege:this.privilege});
  }
  showsyc() {
    this.navCtrl.push("ShowsynchronizePage", { user: this.user ,privilege:this.privilege});
  }
  showbreed() {
    this.navCtrl.push("ShowbreedPage", { user: this.user ,privilege:this.privilege});
  }
  showabortion(){
    this.navCtrl.push("ShowabortionPage", { user: this.user ,privilege:this.privilege});
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
  }
  // ==========================================================
  createPdf() {
    console.log(this.data_cattle);
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
    var month = ['มกราคม','กุมภาพันธุ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฏาคม','สิงหาคม'
    ,'กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    var d = new Date();
    var day = d.getDate()+' '+month[d.getMonth()]+' '+(d.getFullYear()+543)
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
                  { text: this.head_report, style: 'subheader', alignment: 'center' }
                ],
              },
              {
                text: day, alignment: 'right', width: 50
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
                  { text: this.head_report, style: 'subheader', alignment: 'center' }
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
                 { text: this.head_report, style: 'subheader', alignment: 'center' }
               ],
             },
             {
               text: d.toDateString(), alignment: 'right', width: 50
             }
           ]
         }, {
           text: '\n\n',
         },
         this.table(this.data_cattle, ['dam_id', 'program_sync', 'datepro', 'operator', 'recoder']),          {
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
               { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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
             { text: this.head_report, style: 'subheader', alignment: 'center' }
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

  test1(){
    console.log(this.start_date);
    if(this.end_date == ''||this.start_date == ''){
      this.end_date = this.end_date;
    }
    else {
      var date1 = new Date(this.start_date);
      var date2 = new Date(this.end_date);
      var timeDiff = (date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays<0){
        this.end_date = this.start_date;
      }
    }
  }
  test2(){
    console.log(this.end_date);
    if(this.end_date == ''||this.start_date == ''){
      this.start_date = this.start_date;
    }
    else {
      var date1 = new Date(this.start_date);
      var date2 = new Date(this.end_date);
      var timeDiff = (date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays<0){
       this.start_date= this.end_date;
      }
    }
  }
  filterDate(){
    var month = ['มกราคม','กุมภาพันธุ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฏาคม','สิงหาคม'
    ,'กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    var d = new Date(this.start_date);
    console.log(d.getDate()+' '+month[d.getMonth()]+' '+(d.getFullYear()+543))

    d = new Date(this.end_date);
    console.log(d.getDate()+' '+month[d.getMonth()]+' '+(d.getFullYear()+543))
    console.log('Start: '+this.start_date,'End: '+this.end_date);
  }
  selectTypeReport(b){
    console.log(b)
    this.checkTypeReport = b;
  }

  openPDF(){
    if(this.checkTypeReport == true){
      if(this.name == '') {
        swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      }
      else {
        this.queryDataAll();
      }
    }
    else {
      if(this.name == '' || this.start_date == '' || this.end_date == ''){
        swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      } else {
        this.queryDataDate()
      }
    }
  }

  queryDataAll(){
    if(this.name == 'cattle'){
      this.api.getAllCattle(this.user).subscribe(data=>{
        if(data!=null){
       this.data_cattle = Object.keys(data).map(key=>data[key]);
       this.head_report = 'รายงานข้อมูลโคทั้งหมด';
       this.createPdf();
    } else {
      this.data_cattle = [];
      swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
    }
  })
    } else if(this.name == 'maintain') {
      this.api.getMaintainByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลบำรุงทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'synchronize') {
      this.api.getSyncByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลเหนี่ยวนำทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'breed') {
      this.api.getBreedByUser(this.user).subscribe(data=>{
        if(data!=null){
          var i =0;
          this.head_report = 'รายงานข้อมูลผสมพันธุ์ทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          while(i<this.data_cattle.length){
            if(this.data_cattle[i].semen == undefined){
              this.data_cattle[i].sire_id = this.data_cattle[i].sire_id;
            }else {
              this.data_cattle[i].sire_id = this.data_cattle[i].semen;
            }
            i++;
          }
          if(i==this.data_cattle.length){
            this.createPdf();
          }

       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abdominal') {
      this.api.getPregnantByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลตรวจท้องทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'delivery') {
      this.api.getDeliveryByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลคลอดทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          console.log(this.data_cattle);

          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abortion') {
      this.api.getAbortionByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลโคแท้งทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'nurture') {
      this.api.getTreatmentByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลรักษาทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'dishorn') {
      this.api.getHorndeteringByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลสูญเขาทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'branding') {
      this.api.getBrandingByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลตีเบอร์ทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    }  else if(this.name == 'wean') {
      this.api.getWeanByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลหย่านมทั้งหมด';
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
      })
    }
  }

  queryDataDate(){
    var month = ['มกราคม','กุมภาพันธุ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฏาคม','สิงหาคม'
    ,'กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

    var d = new Date(this.start_date);
    var start = d.getDate()+' '+month[d.getMonth()]+' '+(d.getFullYear()+543);

    d = new Date(this.end_date);
    var end = d.getDate()+' '+month[d.getMonth()]+' '+(d.getFullYear()+543);
    console.log('Start: '+this.start_date,'End: '+this.end_date)

    if(this.name == 'cattle'){
      this.api.getCattleByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        console.log(data);
        if(data!=null){
          this.head_report = 'รายงานข้อมูลโควันที่ '+ start +' ถึง ' + end;
       this.data_cattle = Object.keys(data).map(key=>data[key]);
       this.createPdf();
    } else {
      this.data_cattle = [];
      swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
    }
  })
    } else if(this.name == 'maintain') {
      this.api.getMaintainByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลบำรุงวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'synchronize') {
      this.api.getSyncByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลเหนี่ยวนำวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'breed') {
      this.api.getBreedByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลผสมพันธุ์วันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abdominal') {
      this.api.getPregnantByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลตรวจท้องวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'delivery') {
      this.api.getDeliveryByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลคลอดวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abortion') {
      this.api.getAbortionByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลโคแท้งวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'nurture') {
      this.api.getTreatmentByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลรักษาวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'dishorn') {
      this.api.getDishornByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลสูญเขาวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'branding') {
      this.api.getBrandingByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลตีเบอร์วันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    }  else if(this.name == 'wean') {
      this.api.getWeanByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.head_report = 'รายงานข้อมูลหย่านมวันที่ '+ start +' ถึง ' + end;
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.createPdf();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
      })
    }
  }


  openExcel(){
    if(this.checkTypeReport == true){
      if(this.name == '') {
        swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      }
      else {
        this.queryDataAllExcel();
      }
    }
    else {
      if(this.name == '' || this.start_date == '' || this.end_date == ''){
        swal("ขออภัย!", "กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      } else {

        this.queryDataDateExcel()
      }
    }
  }


  queryDataAllExcel(){
    if(this.name == 'cattle'){
      this.api.getAllCattle(this.user).subscribe(data=>{
        if(data!=null){

       this.data_cattle = Object.keys(data).map(key=>data[key]);
       this.OnExport();
    } else {
      this.data_cattle = [];
      swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
    }
  })
    } else if(this.name == 'maintain') {
      this.api.getMaintainByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'synchronize') {
      this.api.getSyncByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'breed') {
      this.api.getBreedByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abdominal') {
      this.api.getPregnantByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'delivery') {
      this.api.getDeliveryByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abortion') {
      this.api.getAbortionByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'nurture') {
      this.api.getTreatmentByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'dishorn') {
      this.api.getHorndeteringByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'branding') {
      this.api.getBrandingByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    }  else if(this.name == 'wean') {
      this.api.getWeanByUser(this.user).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
      })
    }
  }

  queryDataDateExcel(){
    if(this.name == 'cattle'){
      this.api.getCattleByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        console.log(data);
        if(data!=null){
       this.data_cattle = Object.keys(data).map(key=>data[key]);
       this.OnExport();
    } else {
      this.data_cattle = [];
      swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
    }
  })
    } else if(this.name == 'maintain') {
      this.api.getMaintainByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'synchronize') {
      this.api.getSyncByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'breed') {
      this.api.getBreedByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abdominal') {
      this.api.getPregnantByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();;
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'delivery') {
      this.api.getDeliveryByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'abortion') {
      this.api.getAbortionByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'nurture') {
      this.api.getTreatmentByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'dishorn') {
      this.api.getDishornByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    } else if(this.name == 'branding') {
      this.api.getBrandingByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
       console.log(this.data_cattle)
      })
    }  else if(this.name == 'wean') {
      this.api.getWeanByDate(this.user,this.start_date,this.end_date).subscribe(data=>{
        if(data!=null){
          this.data_cattle = Object.keys(data).map(key=>data[key]);
          this.OnExport();
       } else {
         this.data_cattle = [];
         swal("ไม่พบข้อมูล!", "ไม่มีรายการข้อมูลการบันทึกอยู่", "warning");
       }
      })
    }
  }


  clickHide(a){

    if(this.hideverify == a){
      this.hideverify = 0;
    }else{
      this.hideverify = a;
    }
  }
}
