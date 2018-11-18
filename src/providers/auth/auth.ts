import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public user : Observable<firebase.User>;
  constructor(public http: HttpClient,private afAuth:AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    this.user = this.afAuth.authState;
  }

  // loginWithGoogle(){
  //   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

  login(email,password): Observable<any>{
    return Observable.fromPromise(
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
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
}
