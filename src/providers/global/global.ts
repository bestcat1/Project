import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public myGlobalVar: string;
  constructor(public http: HttpClient) {
    this.myGlobalVar = "0";
  }
  setMyGlobalVar(value) {
    this.myGlobalVar = value;
    }

    getMyGlobalVar() {
    return this.myGlobalVar;
    }
}
