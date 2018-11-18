import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagUsersPage } from './manag-users';

@NgModule({
  declarations: [
    ManagUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagUsersPage),
  ],
})
export class ManagUsersPageModule {}
