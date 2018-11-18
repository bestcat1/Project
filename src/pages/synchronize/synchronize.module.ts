import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SynchronizePage } from './synchronize';

@NgModule({
  declarations: [
    SynchronizePage,
  ],
  imports: [
    IonicPageModule.forChild(SynchronizePage),
  ],
})
export class SynchronizePageModule {}
