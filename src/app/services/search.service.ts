import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(public af: AngularFireDatabase) {
    let restaurants = this.af.list('/users');
  }

  getUsers(start, end) {

  }

}
