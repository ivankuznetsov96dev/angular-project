import { Injectable, Output } from '@angular/core';
import { async, from, Observable, of } from 'rxjs';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CrudService } from '../crud/crud.service';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public flag: boolean;

  public user$: Observable<firebase.User | null>;
  // public user$: Observable<any>;

  constructor(
    // private angAuthService: AngularFireAuth,
    // private afs: AngularFirestore,
    // private crudService: CrudService
    private angAuthService: AngularFireAuth,
    private crudService: CrudService,
    private firestoreService: AngularFirestore,
  ) {
    this.user$ = this.angAuthService.authState;
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
        // console.log(authUser);
        // .doc(`${authUser.additionalUserInfo.profile.email}`)
        this.firestoreService
          .collection('users')
          .doc(`${authUser.additionalUserInfo.profile['email']}`)
          .set(authUser.additionalUserInfo.profile, { merge: true });
        localStorage.setItem('userLoginID', authUser.additionalUserInfo.profile['email']);
      }),
      take(1),
    );
  }

  public signOut(): Observable<void> {
    localStorage.clear();
    return from(this.angAuthService.signOut()).pipe(take(1));
  }
}
