import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffinfoPage } from './staffinfo';

@NgModule({
  declarations: [
    StaffinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffinfoPage),
  ],
})
export class StaffinfoPageModule {}
