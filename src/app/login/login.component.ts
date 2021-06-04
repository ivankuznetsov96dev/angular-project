import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CrudService } from '../services/crud/crud.service';

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
      [
        '13-14.05.2021',
        'add open post form. add func set and view comments. refactor in app. bags fix',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/87be2bd93d4528b700e4d83d90ef7d72730208b9',
      ],
      [
        '19.05.2021',
        'fix bags. add profile links and update spa route logic',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/f73e5f6f2b3829c576eb986e4b89f81d72440795',
      ],
      [
        '21.05.2021',
        'fixed view syles. add user info changer. fixed bags. depricate old comments view logic, add new. fixed comments counter in posts. files refactoring',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/e9b908298df1484ef4538d882c0aed0b2a0854b5',
      ],
      [
        '22.05.2021',
        'add date in cards and comments. add coards and comments sort. add navigate limks. fixed bags. changed profile and feed filter',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/51cbdbe409dd6505bc4ecbb4f14e87ac93896bce',
      ],
      [
        '23.05.2021',
        'add tag filter. fixed bags. fixed header.',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/594a28195416e60e50beef9cc11c2f36147d57b7',
      ],
      [
        '23.05.2021',
        'add user searcher. fixed bags. fixed header input in mobile',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/05fb0a61e8945a33e5ad7d40990745d87d1dfcfe',
      ],
      [
        '25.05.2021',
        'fix bags. add close deleted post. code refactoring.',
        'https://github.com/ivankuznetsov96dev/angular-project/commit/5709393cb20dd12c84fbdce0b86048bf799c47cd',
      ],
    ]);
  }

  public goTo(): void {
    this.authService.googleSign().subscribe(() => {
      this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
      // this.router.navigate([`/profile`]);
    });
  }
}
