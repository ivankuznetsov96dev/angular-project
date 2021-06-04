import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest, of, Subscription } from 'rxjs';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CrudService } from '../services/crud/crud.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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

  public windowSize = false;

  public dest: Subscription;

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
    if (event === undefined) return;
    const letterCount = this.searcher.toLowerCase();
    this.usersHintCollections = [];

    if (this.searcher === '' && this.searcher.length === 0) {
      this.usersHintCollections = this.usersCollections.slice(0, 7);
      return;
    }
    this.usersHintCollections = this.usersCollections.filter((element) => {
      if (element.user_name === '') {
        return letterCount.includes(element.name.toLowerCase().slice(0, this.searcher.length));
      }
      return letterCount.includes(element.user_name.toLowerCase().slice(0, this.searcher.length));
    });
    // console.log(this.usersHintCollections);
  }

  public trackFunction(index, item): string {
    return item.id;
  }

  public redirectOnSlectedUserProfile(id) {
    if (
      id === localStorage.getItem('userLoginID') &&
      this.router.url === `/profile/${localStorage.getItem('userLoginID')}`
    ) {
      return;
    }
    localStorage.setItem('currentUserID', id);
    if (this.router.url === '/feed') {
      this.router.navigate(['/profile', id]);
    } else {
      this.location.replaceState(`/profile/${id}`);
      window.location.reload();
    }
  }

  public search() {
    if (this.searcher === undefined) {
      console.log(this.usersHintCollections);
      if (this.usersHintCollections.length !== 0) {
        // console.log(this.usersHintCollections[0].email);
        if (
          this.usersHintCollections[0].email === localStorage.getItem('userLoginID') &&
          this.router.url === `/profile/${localStorage.getItem('userLoginID')}`
        ) {
          return;
        }
        localStorage.setItem('currentUserID', this.usersHintCollections[0].email);
        if (this.router.url === '/feed') {
          this.router.navigate(['/profile', this.usersHintCollections[0].email]);
        } else {
          this.location.replaceState(`/profile/${localStorage.getItem('currentUserID')}`);
          window.location.reload();
        }
      }
    }
    if (this.searcher.split('')[0] === '#') {
      console.log('###########');
      this.tag = this.searcher;
      this.storageService.tag = this.tag;
      localStorage.setItem('tag', this.tag);
      this.searcher = '';
    }
  }

  public deleteTag() {
    this.tag = '';
    this.storageService.tag = null;
    localStorage.removeItem('tag');
  }

  ngOnInit() {
    this.windowSize = window.innerWidth > 850;

    this.dest = this.crud.handleData('users').subscribe((value) => {
      this.usersCollections = value;
    });
  }

  ngOnDestroy(): void {
    this.dest.unsubscribe();
  }
}
