import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { NodeapiProvider } from '../nodeapi/nodeapi';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public user : Observable<firebase.User>;
  constructor(public http: HttpClient,private afAuth:AngularFireAuth,
    private api:NodeapiProvider) {
    console.log('Hello AuthProvider Provider');
    this.user = this.afAuth.authState;
  }

  // loginWithGoogle(){
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

  login(email,password,datapass,key): Observable<any>{
    return Observable.fromPromise(

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user=>{
      console.log(user.massage);
      if(password!=datapass){
      this.api.updateUser(key,{pass:password}).subscribe();
      }
    }).catch((a)=>{
      swal("ผิดพลาด!", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error");
    }

    )
    );
  }
  isAuthenticated(): Observable<boolean>{
    return this.user.map(user=>user&&user.uid !== undefined);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  doRegister(email, password){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })

  }

  getEmail(){
    return this.afAuth.auth.currentUser.email;
  }
  resetPasswordByEmail(email): Observable<any>{
    return Observable.fromPromise(
      this.afAuth.auth.sendPasswordResetEmail(email).then(()=>{
        swal("เปลี่ยนรหัสผ่าน!", "กรุณาตรวจสอบข้อความในอีเมล", "success");
      }
    ).catch(()=>{
      swal("ผิดพลาด!", "กรุณาตรวจสอบอีเมล", "error");
    }))
  }

}
