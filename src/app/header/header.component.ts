import { Component, DoCheck, OnInit } from '@angular/core';
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
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../services/crud/crud.service';
import { StorageService } from '../services/storage/storage.service';

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

  public usersHintCollections;

  public searcher: string;

  public tag: string;

  public windowSize: boolean = false;

  // public inputSubject: Subject<any> = new Subject<any>();

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private crud: CrudService,
    private storageService: StorageService,
    private router: Router,
    private location: Location,
  ) {}

  public userSearcher(event) {
    const letterCount = this.searcher.toLowerCase();
    this.usersHintCollections = [];

    if (this.searcher === '' && this.searcher.length === 0) {
      return;
    }
    this.usersHintCollections = this.usersCollections.filter((element) => {
      if (element.user_name === '') {
        return letterCount.includes(element.name.toLowerCase().slice(0, this.searcher.length));
      } else {
        return letterCount.includes(element.user_name.toLowerCase().slice(0, this.searcher.length));
      }
    });
    // console.log(this.usersHintCollections);
  }
  public trackFunction(index, item): string {
    return item.id;
  }

  public redirectOnSlectedUserProfile(id) {
    localStorage.setItem('currentUserID', id);
    this.location.replaceState(`/profile/${id}`);
    window.location.reload();
    // this.router.navigate(['/profile', id]);
  }

  public search() {
    if (this.searcher.split('')[0] === '#') {
      console.log('###########');
      this.tag = this.searcher;
      this.storageService.tag = this.tag;
      localStorage.setItem('tag', this.tag);
      this.searcher = '';
      return;
    }
    console.log(this.searcher);
    localStorage.setItem('currentUserID', this.searcher);
    console.log(this.router.url);

    if (this.router.url === '/feed') {
      this.router.navigate(['/profile', localStorage.getItem('currentUserID')]);
      // window.location.reload();
    } else {
      this.searcher = '';
      // this.router.navigate(['/profile', localStorage.getItem('currentUserID')]);
      this.location.replaceState(`/profile/${localStorage.getItem('currentUserID')}`);
      window.location.reload();
    }
  }

  public deleteTag() {
    this.tag = '';
    this.storageService.tag = null;
    localStorage.removeItem('tag');
  }

  ngOnInit() {
    this.windowSize = window.innerWidth > 850 ? true : false;
    // this.crud.handleData('posts').subscribe((data) => this.storageService.books = data);
    // this.storageService.setTag(localStorage.getItem('tag'));
    // console.log(this.storageService.getTag());
    // console.log(this.storageService.tagData);

    // this.storageService.tag = localStorage.getItem('tag');
    // this.storageService.tag$.subscribe(value => console.log(value));

    // this.storageService.books$.subscribe((value) => console.log(value));
    // this.storageService.books$.subscribe(value => console.log(value))
    // this.storageService.books$.subscribe();

    this.crud.handleData('users').subscribe((value) => {
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
