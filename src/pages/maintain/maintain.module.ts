import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintainPage } from './maintain';

@NgModule({
  declarations: [
    MaintainPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintainPage),
  ],
})
export class MaintainPageModule {}
