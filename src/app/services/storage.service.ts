import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public books$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private  _books: any;

  constructor() { }

  public get books(): any {
    return this._books;
  }

  public set books(_books: any) {
    this._books = _books;
    this.books$.next(_books);
  }
}
