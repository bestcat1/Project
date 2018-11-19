import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../../environments/firebase.config';
import { map } from 'rxjs/operators';

/*
  Generated class for the NodeapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NodeapiProvider {

  constructor(public http: Http) {
    console.log('Hello NodeapiProvider Provider');
  }

  getTypeAll(type) {
    return this.http.get(URL_API.NODE_API + '/' + type + '/show').pipe(map(res => res.json()));
  }

  getTypeByKey(type, user, key) {
    console.log(type, user, key);
    return this.http.get(URL_API.NODE_API + '/' + type + '/show/' + user + '/' + key).pipe(map(res => res.json()));
  }

  addDataType(type, user: string, data: any) {
    return this.http.post(URL_API.NODE_API + '/' + type + '/add/' + user, data).pipe(map(res => res.json()));
  }

  updateType(type, user, key, data) {
    return this.http.post(URL_API.NODE_API + '/' + type + '/update/' + user + '/' + key, data).pipe(map(res => res.json()));
  }

  getFarm(type, user) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/' + type + '/' + user).pipe(map(res => res.json()));
  }

  getUser(user) {
    return this.http.get(URL_API.NODE_API + '/User/' + user).pipe(map(res => res.json()));
  }

  getPersonnel(adminfarm) {
    return this.http.get(URL_API.NODE_API + '/personnel/' + adminfarm).pipe(map(res => res.json()));
  }

  getDrugProMain(user, pro_main) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/program_maintain/drug_pro_maintain/' + user + '/' + pro_main).pipe(map(res => res.json()));
  }

  getCattleByCorral(user, corral) {
    return this.http.get(URL_API.NODE_API + '/cattle/showcorral/' + user + '/' + corral).pipe(map(res => res.json()));
  }

  addCattle(user, data) {
    return this.http.post(URL_API.NODE_API + '/cattle/add/' + user, data).pipe(map(res => res.json()));
  }

  getCorral(user) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/corral/' + user).pipe(map(res => res.json()));
  }

  getColor(user) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/color/' + user).pipe(map(res => res.json()));
  }

  getBreed(user) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/breed/' + user).pipe(map(res => res.json()));
  }

  getAllCattle(user) {
    return this.http.get(URL_API.NODE_API + '/cattle/showAll/' + user).pipe(map(res => res.json()));
  }

  getProgramSync(user) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/program_sync/' + user).pipe(map(res => res.json()));
  }

  addUser(data) {
    return this.http.post(URL_API.NODE_API + '/User/add', data).pipe(map(res => res.json()));
  }

  getUserAll() {
    return this.http.get(URL_API.NODE_API + '/User').pipe(map(res => res.json()));
  }

  getDataBreed(user) {
    return this.http.get(URL_API.NODE_API + '/breed/show/' + user).pipe(map(res => res.json()));
  }

  getDataBreedById(user, id) {
    return this.http.get(URL_API.NODE_API + '/breed/show/' + user + '/' + id).pipe(map(res => res.json()));
  }

  getNotiById(user, id) {
    return this.http.get(URL_API.NODE_API + '/setting/farm/notification/' + user + '/' + id).pipe(map(res => res.json()));
  }
  addDelivery(user,data){
    return this.http.post(URL_API.NODE_API+'/delivery/add/'+user,data).pipe(map(res=>res.json()));
  }
  addCalf(user,data){
    return this.http.post(URL_API.NODE_API + '/calf/add/'+user,data).pipe(map(res=>res.json()));
  }
  addNoti(user,date,data){
    return this.http.post(URL_API.NODE_API+'/notification/add/'+user+'/'+date,data).pipe(map(res=> res.json()));
  }
  getAllCalf(user){
    return this.http.get(URL_API.NODE_API + '/calf/show/'+user).pipe(map(res=> res.json()));
  }

  getDrug(user){
    return this.http.get(URL_API.NODE_API+'/setting/farm/drug/'+user).pipe(map(res=>res.json()));
  }

  addTreatment(user,data){
    return this.http.post(URL_API.NODE_API+'/treatment/add/'+user,data).pipe(map(res=>res.json()));
  }

  addTreatmentDrug(user,id,data){
    return this.http.post(URL_API.NODE_API+'/treatment/add/'+user+'/'+id,data).pipe(map(res=>res.json()));
  }

  addAbortion(user,data){
    return this.http.post(URL_API.NODE_API+'/abortion/add/'+user,data).pipe(map(res=>res.json()));
  }

  getCalfById(user,id){
    return this.http.get(URL_API.NODE_API+'/calf/show/'+user+'/'+id).pipe(map(res=>res.json()))
  }

  addDishorn(user,data){
    return this.http.post(URL_API.NODE_API+'/dishorn/add/'+user,data).pipe(map(res=>res.json()));
  }

  addBranding(user,data){
    return this.http.post(URL_API.NODE_API+'/branding/add/'+user,data).pipe(map(res=>res.json()));
  }

  addWean(user,data){
    return this.http.post(URL_API.NODE_API+'/wean/add/'+user,data).pipe(map(res=>res.json()));
  }

  showNotification(user){
    return this.http.get(URL_API.NODE_API+'/setting/notification/'+user).pipe(map(res=>res.json()));
  }
  editNotificationByKey(user,key,data){
    return this.http.post(URL_API.NODE_API+'/setting/notification/edit/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }

  showAlertDate(user){
    return this.http.get(URL_API.NODE_API+'/notification/show/date/'+user).pipe(map(res=>res.json()));
  }

  showAlertDateDetail(user,date){
    return this.http.get(URL_API.NODE_API+'/notification/show/date/detail/'+user+'/'+date).pipe(map(res=>res.json()));
  }

  deleteAlertDataDetail(user,date,key){
    return this.http.delete(URL_API.NODE_API+'/notification/delete/'+date+'/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  addCorral(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/corral/'+user,data).pipe(map(res=>res.json()));
  }

  removeCorral(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/corral/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  addBreed(user,data){
    return this.http.post(URL_API.NODE_API+'/breed/add/'+user,data).pipe(map(res=>res.json()));
  }

  addPregnant(user,data){
    return this.http.post(URL_API.NODE_API+'/pregnant/add/'+user,data).pipe(map(res=>res.json()));
  }

  updateCorral(user,key,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/corral/update/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }
  getUserByEmail(email){
    return this.http.get(URL_API.NODE_API+'/User/email/'+email).pipe(map(res=>res.json()));
  }

 addBrandFarm(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/brand/add/'+user,data).pipe(map(res=>res.json()));
  }

  editCalf(user,key,data){
    return this.http.post(URL_API.NODE_API+'/calf/edit/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }

  getCattleByBreed(user,breed){
    return this.http.get(URL_API.NODE_API+'/cattle/showbreed/'+user+'/'+breed).pipe(map(res=>res.json()));
  }

  updateBreed(user,key,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/breed/update/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }

  removeBreed(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/breed/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  addSettingBreed(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/breed/add/'+user,data).pipe(map(res=>res.json()));
  }

  addColor(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/color/add/'+user,data).pipe(map(res=>res.json()));
  }

  removeColor(user,key){
    return  this.http.delete(URL_API.NODE_API+'/setting/farm/color/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  getCattleByColor(user,color){
    return this.http.get(URL_API.NODE_API+'/cattle/showcolor/'+user+'/'+color).pipe(map(res=>res.json()));
  }

  updateColor(user,key,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/color/update/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }

  addProgram_maintain(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/program_maintain/add/'+user,data).pipe(map(res=>res.json()));
  }

  removeProgram_maintain(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/program_maintain/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  getDetailMaintainByType(user,type){
    return this.http.get(URL_API.NODE_API+'/setting/farm/program_maintain/drug_pro_maintain/'+user+'/'+type).pipe(map(res=>res.json()));
  }

  addDetailMaintain(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/program_maintain/drug_pro_maintain/add/'+user,data).pipe(map(res=>res.json()));
  }

  removeDetailMaintain(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/program_maintain/drug_pro_maintain/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  updateDetailMaintain(user,key,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/program_maintain/drug_pro_maintain/update/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }

  addProgramSync(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/program_sync/add/'+user,data).pipe(map(res=>res.json()));
  }

  removeProgramSync(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/program_sync/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  getDrugProgramSync(user,type){
    return this.http.get(URL_API.NODE_API+'/setting/farm/program_sync/drug_pro_sync/'+user+'/'+type).pipe(map(res=>res.json()));
  }

  addDetailProgramSync(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/program_sync/drug_pro_sync/add/'+user,data).pipe(map(res=>res.json()));
  }

  removeDetailProgramSync(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/program_sync/drug_pro_sync/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }

  updateDetailProgramSync(user,key,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/program_sync/drug_pro_sync/update/'+user+'/'+key,data).pipe(map(res=>res.json()));
  }

  addDrug(user,data){
    return this.http.post(URL_API.NODE_API+'/setting/farm/drug/add/'+user,data).pipe(map(res=>res.json()));
  }

  removeDrug(user,key){
    return this.http.delete(URL_API.NODE_API+'/setting/farm/drug/remove/'+user+'/'+key).pipe(map(res=>res.json()));
  }
}
