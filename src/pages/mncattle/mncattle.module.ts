import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MncattlePage } from './mncattle';

@NgModule({
  declarations: [
    MncattlePage,
  ],
  imports: [
    IonicPageModule.forChild(MncattlePage),
  ],
})
export class MncattlePageModule {}
