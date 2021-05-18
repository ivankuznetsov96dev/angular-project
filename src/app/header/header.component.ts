import { Component, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { AngularFirestore } from '@angular/fire/firestore';
import {CrudService} from "../services/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // public searcher: string;
  //
  // startAt = new Subject();
  // endAt = new Subject();
  //
  // emails;
  //
  // startobs = this.startAt.asObservable();
  // endobs = this.endAt.asObservable();

  public usersCollections;
  public searcher: string;

  constructor(private afs: AngularFirestore, private crud: CrudService, private router: Router) {}

  public search() {
    console.log(this.searcher);
    localStorage.setItem('currentUserID', this.searcher);
    console.log(this.router.url);

    if (this.router.url === '/feed') {
      this.router.navigate(['/profile', localStorage.getItem('currentUserID')]);
      // window.location.reload();
    } else {
      this.searcher = '';
      this.router.navigate(['/profile', localStorage.getItem('currentUserID')]);
    }
  }

  ngOnInit() {
    this.crud.handleData('users').subscribe(value => {
      this.usersCollections = value;
    });

    // Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
    //   this.firequery(value[0], value[1]).subscribe((emails) => {
    //     this.emails = emails;
    //   })
    // })

    // const url = 'https://api.github.com/search/users?q=';
    // this.inputSubject
    //   .pipe(
    //     debounceTime(600),
    //     map((value) => value.target.value),
    //     filter((value: string) => value.length > 3),
    //     distinctUntilChanged(),
    //     switchMap((value: string) =>
    //       ajax.getJSON(url + value).pipe(catchError(() => of('some error'))),
    //     ),
    //   )
    //   .subscribe();
  }

  // search($event) {
    // const q = $event.target.value;
    // this.startAt.next(q);
    // this.endAt.next(q + '\uf8ff');
  // }

  // firequery(start, end) {
  //   return this.afs.collection('users', ref => ref.limit(4).orderBy('email').startAt(start).endAt(end)).valueChanges();
  // }
}
