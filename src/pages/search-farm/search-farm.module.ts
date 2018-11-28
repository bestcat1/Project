import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFarmPage } from './search-farm';

@NgModule({
  declarations: [
    SearchFarmPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchFarmPage),
  ],
})
export class SearchFarmPageModule {}
