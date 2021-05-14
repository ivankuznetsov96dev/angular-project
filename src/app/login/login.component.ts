import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public test;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private crudService: CrudService,
  ) {}

  public eventCounter: string[] = ['container', 'right-panel-active'];

  public openSignInPanel(): void {
    this.eventCounter.pop();
  }

  public openSignUpPanel(): void {
    this.eventCounter.push('right-panel-active');
  }

  ngOnInit(): void {
    // this.crudService.getData<any>('testbase').subscribe(value => {
    //   console.log(value);
    // });

    console.table([
      [
        '23.04.2021',
        'add prifile avatar view. add post creater info in feed cards. add like btn color changer',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/989553fa45a042a9bd1678eb71b93573176dce06',
      ],
      [
        '24.04.2021',
        'add eslint statements. fixed code style in app',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/165d58e281df1cbd5dae130fa1a966957b88035e',
      ],
      [
        '26-27.04.2021',
        'implements users subs. add user searcher (crutch). add new css properties for header and profile posts',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/65c3553284610aa43d01ebea7f51c9c4e38f94f9',
      ],
      [
        '27.04.2021',
        'update feed filter(feed includ user and subs posts). fixed navigate bag',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/2c2854bfe3ad6e4ad9913ef6f80fe806f0e6bb8f',
      ],
      [
        '30.04.2021',
        'fixed likes view bag',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/e166db06f986d22b03c9d49431855715aa82272b',
      ],
      [
        '11.05.2021',
        'add profile open/closed functional. add profile count view',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/f5bb0c304b6bee3ddcc65318b4c1444509d2d9a8',
      ],
    ]);

    // this.firestore.doc('/users/ivan.kuznetsov.dev@gmail.com').get().subscribe(value => console.log(value));
    // this.crudService.getTest('/users/ivan.kuznetsov.dev@gmail.com').subscribe(value => console.log(value));

    // (this.firestore.collection('users').doc('nevi.kiv@gmail.com').get()).pipe(map(value => value.exists)).subscribe(value => console.log(value));
    // (this.firestore.collection('users').doc('kivfox.kuznetsov@gmail.com').get()).pipe(map(value => value.exists)).subscribe(value => console.log(value));

    // this.firestore.collection('users').doc('nevi.kiv@gmail.com').get().subscribe(value => console.log(value.exists))

    // this.crudService.handleData('users').subscribe(value => console.log(value));
    // this.crudService.getObjectByRef('users', 'ivan.kuznetsov.dev@gmail.com').subscribe(value => console.log(value));
    // this.crudService.getObjectByRef('users', 'kivfox.kuznetsov@gmail.com').subscribe(value => console.log(value));
    // if (this.crudService.getObjectByRef('users', 'ivan.kuznetsov.dev@gmail.com')) {
    //   console.log('this is true')
    // } else {
    //   console.log('this is false')
    // }
  }

  public goTo(): void {
    this.authService.googleSign().subscribe(() => {
      this.router.navigate(['/profile']);
    });
    // this.authService.googleSign();
    // this.router.navigate(['/profile']);

    // this.crudService.createEntity('testbase', {model: 'bmv'}).subscribe(value => console.log(value))
    // this.crudService.createEntity('testbase', {model: 'bmv', lastName: 'qweqfqfq'}).pipe(
    //   tap(value => console.log(value)),
    //   switchMap(value => {
    //     return this.crudService.updateObject('testbase', value, {'name': 'test2', 'sur': 'test3'}).pipe(map(() => value))
    //   }),
    //   // switchMap(value => this.crudService.deleteObject('testbase', value))
    // ).subscribe();
  }
}
