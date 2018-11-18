import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreedPage } from './breed';

@NgModule({
  declarations: [
    BreedPage,
  ],
  imports: [
    IonicPageModule.forChild(BreedPage),
  ],
})
export class BreedPageModule {}
