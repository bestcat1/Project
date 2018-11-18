import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurturePage } from './nurture';

@NgModule({
  declarations: [
    NurturePage,
  ],
  imports: [
    IonicPageModule.forChild(NurturePage),
  ],
})
export class NurturePageModule {}
