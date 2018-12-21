import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNotificationPage } from './detail-notification';

@NgModule({
  declarations: [
    DetailNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNotificationPage),
  ],
})
export class DetailNotificationPageModule {}
