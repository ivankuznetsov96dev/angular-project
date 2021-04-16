import {Injectable, Output} from '@angular/core';
import {async, from, Observable, of} from "rxjs";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {map, switchMap, take, tap} from "rxjs/operators";
import auth = firebase.auth;
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {CrudService} from "../crud.service";
import {StoreService} from "../store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public flag: boolean;

  public user$: Observable<firebase.User | null>
  // public user$: Observable<any>;

  constructor(
    // private angAuthService: AngularFireAuth,
    // private afs: AngularFirestore,
    // private crudService: CrudService
    private angAuthService: AngularFireAuth,
    private crudService: CrudService,
    private storeServie: StoreService,
    private firestoreService: AngularFirestore,
  ) {
    this.user$ = this.angAuthService.authState;
    // this.user$ = this.angAuthService.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.firestoreService.doc<firebase.User>(`users/${user.uid}`).valueChanges();
    //       // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return  of(null)
    //       // return this.crudService.updateObject('users', user.uid, user);
    //     }
    //   })
    // );

    // this.angAuthService.authState
    //   .pipe(
    //     tap((user: firebase.User) => {
    //       this.storeServie.user = user;
    //     }),
    //     switchMap((user: firebase.User) => {
    //       if (user) {
    //         return this.firestoreService.doc<firebase.User>(`users/${user.uid}`).valueChanges();
    //       }
    //       return of(null);
    //     }),
    //   )
    //   .subscribe();

  }

  // public googleSign(): Observable<auth.UserCredential> {
  //   const provider = new auth.GoogleAuthProvider();
  //   return from(this.angAuthService.signInWithPopup(provider)).pipe(
  //     tap((authUser: auth.UserCredential) => {
  //       console.log(authUser);
  //     }),
  //     take(1),
  //   );
  // }

  public googleSign(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.angAuthService.signInWithPopup(provider)).pipe(
      tap((authUser: auth.UserCredential) => {

        this.firestoreService.collection('users').doc(`${authUser.additionalUserInfo.profile['email']}`).set(authUser.additionalUserInfo.profile, {merge: true});
        localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);


        // this.firestoreService.doc(`users/${authUser.additionalUserInfo.profile['email']}`).update(authUser.additionalUserInfo.profile)
        //   .then(()=> {
        //     console.log('update successful (document exists)')
        //   })
        //   .catch((error) => {
        //     this.firestoreService.doc(`users/${authUser.additionalUserInfo.profile['email']}`)
        //       .set(authUser.additionalUserInfo.profile)
        //   });

        // (this.firestoreService.collection('users').doc(authUser.additionalUserInfo.profile['email']).get())
        //   .pipe(map(value => value.exists)).subscribe(value => {
        //     if (value) {
        //       console.log('this.is.true');
        //       this.flag = true;
        //       // localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
        //     } else {
        //       console.log('this.is.false');
        //       this.flag = false;
        //     // this.firestoreService.collection('users').doc(`${authUser.additionalUserInfo.profile['email']}`).set(authUser.additionalUserInfo.profile);
        //     // localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
        //   }
        // });

        // if ((this.firestoreService.collection('users').doc(authUser.additionalUserInfo.profile['email']).get()).pipe(map(value => value.exists)).subscribe()){
        //   console.log('this.is.true');
        // } else {
        //   console.log('this.is.false')
        // }
        // if (this.firestoreService.collection('users').doc(authUser.additionalUserInfo.profile['email']).get().subscribe(value => value.exists)) {
        //   localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
        // } else {
        //   this.firestoreService.collection('users').doc(`${authUser.additionalUserInfo.profile['email']}`).set(authUser.additionalUserInfo.profile);
        //   localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
        // }

        // if (this.crudService.getObjectByRef('users', authUser.additionalUserInfo.profile['email']).subscribe(value => value.exist) === true) {
        //   localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
        // } else {
        //     this.firestoreService.collection('users').doc(`${authUser.additionalUserInfo.profile['email']}`).set(authUser.additionalUserInfo.profile);
        //     localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
        // }
        console.log(localStorage.getItem('userLoginID'));

      }),
      take(1),
    );
  }

  // public googleSign(): Observable<auth.UserCredential> {
  //   const provider = new auth.GoogleAuthProvider();
  //   return from(this.angAuthService.signInWithPopup(provider)).pipe(
  //     tap((userCred: auth.UserCredential) => {
  //       this.updateUserData(userCred.user);
  //     }),
  //     take(1),
  //   );
  // }
  //
  // private updateUserData(user): void {
  //    // this.crudServiceService.updateObject('users', user.uid, user);
  // }


  // async googleSign() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const creditial = await this.angAuthService.signInWithPopup(provider);
  //   return this.updateUsersData(creditial.user);
  // }

  public signOut(): Observable<void> {
    return from(this.angAuthService.signOut()).pipe(take(1));
  }

  // public updateUsersData({uid, email, displayName, photoURL}: User) {
  //   // const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
  //
  //   const data = {
  //     uid,
  //     email,
  //     displayName,
  //     photoURL
  //   }
  //
  //   // const data = {
  //   //   uid: user.uid,
  //   //   email: user.email,
  //   //   displayName: user.displayName,
  //   //   photoURL: user.photoURL
  //   // };
  //   return userRef.set(data, {merge: true})
  // }
}
