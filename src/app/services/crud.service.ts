import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import firebase from 'firebase';
import firestore = firebase.firestore;
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestoreService: AngularFirestore) {}

  // public getData(collectionName: string): Observable<any> {
  //   this.firestoreService.collection(collectionName).snapshotChanges().pipe(
  //     map((actions) => {
  //       actions.map((reference) => {
  //         const data: any = reference.payload.doc.data();
  //         const id = reference.payload.doc.id;
  //         return {id, ...data};
  //       })
  //     })
  //   );
  // }

  public updateObject(collectionName: string, id: string, data: {}): Observable<void> {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set(data, { merge: true }),
    ).pipe(take(1));
  }

  // public updateMapObject(collectionName: string, id: string, collectionMap: string): Observable<any> {
  //   // return from(this.firestoreService.collection(collectionName).doc(`${id}/${collectionMap}`).set(data, {merge:false})).pipe(take(1));
  //   return from(this.firestoreService.collection(collectionName).doc(`${id}/${collectionMap}`).get()).pipe(map(value => value.data()), take(1));
  // }

  public updateObjectWithUpdate(collectionName: string, id: string, data: {}): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).update(data)).pipe(
      take(1),
    );
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }

  public getObjectByRef(collectionName: string, id: string): Observable<any> {
    return from(this.firestoreService.collection(collectionName).doc(id).get()).pipe(
      map((value) => value.data()),
      take(1),
    );
  }

  // public updateMapObject(collectionName: string, id: string, coll: string): Observable<any> {
  //   return from(this.firestoreService.collection(collectionName).doc(`${id}/${coll}`).get()).pipe(map(value => value.data()), take(1));
  // }

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: DocumentReference) => value.id),
      take(1),
    );
  }

  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where('name', '==', 'test').where('id', '==', '123213');
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          }),
        ),
        take(1),
      );
  }

  public handleData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((reference) => {
            const data: any = reference.payload.doc.data();
            const { id } = reference.payload.doc;
            return { id, ...data } as T;
          }),
        ),
      );
  }

  // public handleTest(collectionName: string, id: string): Observable<any> {
  //   return from(this.firestoreService.collection(collectionName).doc(`${id}/user_posts`).get()).pipe(take(1));
  // }
}
