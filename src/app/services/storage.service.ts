import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public tag$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private _tag: any;

  constructor() {}

  public get tag(): any {
    return this._tag;
  }

  public set tag(_tag: any) {
    this._tag = _tag;
    this.tag$.next(_tag);
  }
}
