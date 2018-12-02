import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule} from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule} from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MenuPageModule } from '../pages/menu/menu.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { MncattlePageModule } from '../pages/mncattle/mncattle.module';
import { MndamPageModule } from '../pages/mndam/mndam.module';
import { MncalfPageModule } from '../pages/mncalf/mncalf.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import { VerifyPageModule } from '../pages/verify/verify.module';
import { ReportPageModule } from '../pages/report/report.module';
import { MaintainPageModule } from '../pages/maintain/maintain.module';
import { ShowmaintainPageModule } from '../pages/showmaintain/showmaintain.module';
import { AddcattlePageModule } from '../pages/addcattle/addcattle.module';
import { BrandingcalfPageModule } from '../pages/brandingcalf/brandingcalf.module';
import { DishorncalfPageModule } from '../pages/dishorncalf/dishorncalf.module';
import { WeancalfPageModule } from '../pages/weancalf/weancalf.module';
import { SynchronizePageModule } from '../pages/synchronize/synchronize.module';
import { BreedPageModule } from '../pages/breed/breed.module';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DatePicker } from '@ionic-native/date-picker';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ShowcattlePageModule } from '../pages/showcattle/showcattle.module';
import { AbdominalPageModule } from '../pages/abdominal/abdominal.module';
import { DeliveryPageModule } from '../pages/delivery/delivery.module';
import { NurturePageModule } from '../pages/nurture/nurture.module';
import { ShowabdominalPageModule } from '../pages/showabdominal/showabdominal.module';
import { ShowBrandingcalfPageModule } from '../pages/show-brandingcalf/show-brandingcalf.module';
import { ShowdeliveryPageModule } from '../pages/showdelivery/showdelivery.module';
import { ShowDishorncalfPageModule } from '../pages/show-dishorncalf/show-dishorncalf.module';
import { ShownurturePageModule } from '../pages/shownurture/shownurture.module';
import { ShowWeancalfPageModule } from '../pages/show-weancalf/show-weancalf.module';
import { ShowsynchronizePageModule } from '../pages/showsynchronize/showsynchronize.module';
import { ShowbreedPageModule } from '../pages/showbreed/showbreed.module';
import { EditcattlePageModule } from '../pages/editcattle/editcattle.module';
//import { NightdatabaseConfig } from '../environments/nightdatabase';
import { EditdatauserPageModule } from '../pages/editdatauser/editdatauser.module';
import { EditdetailcattlePageModule } from '../pages/editdetailcattle/editdetailcattle.module';
import { ShowdetaildishorncalfPageModule } from '../pages/showdetaildishorncalf/showdetaildishorncalf.module';
import { ShowdatailbrandingcalfPageModule } from '../pages/showdatailbrandingcalf/showdatailbrandingcalf.module';
import { ShowdatailweancalfPageModule } from '../pages/showdatailweancalf/showdatailweancalf.module';
import { GlobalProvider } from '../providers/global/global';
import { HttpClientModule } from '@angular/common/http';
import { SettingcorralPageModule } from '../pages/settingcorral/settingcorral.module';
import { SettingfarmPageModule } from '../pages/settingfarm/settingfarm.module';
import { SettingstrianPageModule } from '../pages/settingstrian/settingstrian.module';
import { SettingcolorPageModule } from '../pages/settingcolor/settingcolor.module';
import { SelectmaintainPageModule } from '../pages/selectmaintain/selectmaintain.module';
import { CorralmaintainPageModule } from '../pages/corralmaintain/corralmaintain.module';
import { SelectsynchronizePageModule } from '../pages/selectsynchronize/selectsynchronize.module';
import { SelectabdominalPageModule } from '../pages/selectabdominal/selectabdominal.module';
import { SelectdeliveryPageModule } from '../pages/selectdelivery/selectdelivery.module';
import { SelectnurturePageModule } from '../pages/selectnurture/selectnurture.module';
import { SelectbreedPageModule } from '../pages/selectbreed/selectbreed.module';
import { CorralsyncPageModule } from '../pages/corralsync/corralsync.module';
import { CorralbreedingPageModule } from '../pages/corralbreeding/corralbreeding.module';
import { SettingprogrammaintainPageModule } from '../pages/settingprogrammaintain/settingprogrammaintain.module';
import { SettingprogramsyncPageModule } from '../pages/settingprogramsync/settingprogramsync.module';
import { SettingdetailprogramsyncPageModule } from '../pages/settingdetailprogramsync/settingdetailprogramsync.module';
import { ShowdetailprogramsyncPageModule } from '../pages/showdetailprogramsync/showdetailprogramsync.module';
import { VerifyProSyncPageModule } from '../pages/verify-pro-sync/verify-pro-sync.module';
import { SettingdetailprogreammaintainPageModule } from '../pages/settingdetailprogreammaintain/settingdetailprogreammaintain.module';
import { ShowdetailprogrammaintainPageModule } from '../pages/showdetailprogrammaintain/showdetailprogrammaintain.module';
import { AbortionPageModule } from '../pages/abortion/abortion.module';
import { SelectabortionPageModule } from '../pages/selectabortion/selectabortion.module';
import { ForgetpasswordPageModule } from '../pages/forgetpassword/forgetpassword.module';
import { Forgetpassword1PageModule } from '../pages/forgetpassword1/forgetpassword1.module';
import { Network } from '@ionic-native/network';
import { SelectdishorncalfPageModule } from '../pages/selectdishorncalf/selectdishorncalf.module';
import { SelectweancalfPageModule } from '../pages/selectweancalf/selectweancalf.module';
import { SelectbrandingcalfPageModule } from '../pages/selectbrandingcalf/selectbrandingcalf.module';
import { SettingdrugPageModule } from '../pages/settingdrug/settingdrug.module';
import { RegisterstaffPageModule } from '../pages/registerstaff/registerstaff.module';
import { StaffinfoPageModule } from '../pages/staffinfo/staffinfo.module';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Crop } from '@ionic-native/crop';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { NodeapiProvider } from '../providers/nodeapi/nodeapi';
import { HttpModule } from '@angular/http';
import { Calendar } from '@ionic-native/calendar';
import { Base64 } from '@ionic-native/base64';
import { NgCalendarModule  } from 'ionic2-calendar';
import { HTTP } from '@ionic-native/http';
import { SettingherdnumPageModule } from '../pages/settingherdnum/settingherdnum.module';
import { SearchFarmPageModule } from '../pages/search-farm/search-farm.module';
import { ShowabortionPageModule } from '../pages/showabortion/showabortion.module';
import { ShowdtabortionPageModule } from '../pages/showdtabortion/showdtabortion.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MenuPageModule,
    DetailPageModule,
    RegisterPageModule,
    MncattlePageModule,
    MndamPageModule,
    MncalfPageModule,
    SettingPageModule,
    VerifyPageModule,
    ReportPageModule,
    MaintainPageModule,
    ShowmaintainPageModule,
    AddcattlePageModule,
    BrandingcalfPageModule,
    DishorncalfPageModule,
    WeancalfPageModule,
    SynchronizePageModule,
    BreedPageModule,
    ProfilePageModule,
    ShowcattlePageModule,
    AbdominalPageModule,
    DeliveryPageModule,
    NurturePageModule,
    ShowabdominalPageModule,
    ShowBrandingcalfPageModule,
    ShowdeliveryPageModule,
    ShowDishorncalfPageModule,
    ShowmaintainPageModule,
    ShownurturePageModule,
    ShowWeancalfPageModule,
    ShowsynchronizePageModule,
    ShowbreedPageModule,
    EditcattlePageModule,
    EditdatauserPageModule,
    EditdetailcattlePageModule,
    ShowdetaildishorncalfPageModule,
    ShowdatailbrandingcalfPageModule,
    ShowdatailweancalfPageModule,
    HttpClientModule,
    SettingcorralPageModule,
    SettingfarmPageModule,
    SettingstrianPageModule,
    SettingcolorPageModule,
    SelectmaintainPageModule,
    CorralmaintainPageModule,
    SelectsynchronizePageModule,
    SelectbreedPageModule,
    SelectabdominalPageModule,
    SelectdeliveryPageModule,
    SelectnurturePageModule,
    CorralsyncPageModule,
    CorralbreedingPageModule,
    SettingprogrammaintainPageModule,
    SettingprogramsyncPageModule,
    SettingdetailprogramsyncPageModule,
    ShowdetailprogramsyncPageModule,
    VerifyProSyncPageModule,
    SettingdetailprogreammaintainPageModule,
    ShowdetailprogrammaintainPageModule,
    AbortionPageModule,
    SelectabortionPageModule,
    ForgetpasswordPageModule,
    Forgetpassword1PageModule,
    SelectdishorncalfPageModule,
    SelectweancalfPageModule,
    SelectbrandingcalfPageModule,
    SettingdrugPageModule,
    RegisterstaffPageModule,
    StaffinfoPageModule,
    HttpModule,
    SettingherdnumPageModule,
    SearchFarmPageModule,
    ShowabortionPageModule,
    ShowdtabortionPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    LocalNotifications,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileTransfer,
    Camera,
    Crop,
    GlobalProvider,
    File,
    FileOpener,
    AngularFireAuth,
    AuthProvider,
   NodeapiProvider,
   Calendar,
   Base64,
   HTTP
  ]
})
export class AppModule {}
