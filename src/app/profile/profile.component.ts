import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth/auth.service';
import { UploadService } from '../services/upload.service';
import { StorageService } from '../services/storage.service';
import { PostOpenComponent } from '../post-open/post-open.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  myFirstReactiveForm: FormGroup;

  public progress;

  public imageLink;

  public test;

  public userCount;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
  ) {
    if (this.router.url === '/profile') {
      this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
    }
    // console.log(this.route.snapshot.params.id);
    // console.log(this.route.snapshot.params);
    // console.log(this.route.snapshot.params.post);
    localStorage.setItem('currentUserID', this.route.snapshot.params.id);
    if (localStorage.getItem('userLoginID') === localStorage.getItem('currentUserID')) {
      localStorage.removeItem('currentUserID');
    }

    if (localStorage.getItem('currentUserID')) {
      this.crudService
        .getObjectByRef('users', localStorage.getItem('currentUserID'))
        .subscribe((value) => {
          if (value === undefined) {
            localStorage.removeItem('currentUserID');
            // this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
            this.location.replaceState(`/profile/${localStorage.getItem('userLoginID')}`);
            window.location.reload();
          }
        });
    }
    if (this.route.snapshot.params.post) {
      this.crudService
        .getObjectByRef('posts', this.route.snapshot.params.post)
        .subscribe((value) => {
          const openPostCard = value;
          openPostCard.id = this.route.snapshot.params.post;
          console.log(openPostCard);
          this.crudService
            .getObjectByRef('users', openPostCard.userPostCreater)
            .subscribe((val) => {
              let postCreater;
              let postCreaterAvatar;
              const postCreaterID = val.email;
              if (val.user_avatar !== '') {
                postCreaterAvatar = val.user_avatar;
              } else {
                postCreaterAvatar = val.picture;
              }
              if (val.user_name !== '') {
                postCreater = val.user_name;
              } else {
                postCreater = val.name;
              }
              // console.log(this.postCreater, this.postCreaterID, this.postCreaterAvatar);
              this.postOpen(openPostCard, postCreater, postCreaterID, postCreaterAvatar);
            });
        });
    }
  }

  // public inputSubject: Subject<any> = new Subject<any>();
  // public subscriptions: Subscription[] = [];

  public counterObj;

  public counter;

  ngOnInit(): void {
    // this.firestore.collection('picture').valueChanges().subscribe(value=> {
    //   this.counterObj = value;
    //   console.log(...this.counterObj);
    // });

    // this.counter = this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe();
    // console.log(this.counter)

    this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe((value) => {
        if (value.user_posts === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_posts: {},
          });
        }
        if (value.user_avatar === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_avatar: '',
          });
        }
        if (value.user_name === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_name: '',
          });
        }
        if (value.user_info === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_info: '',
          });
        }
        if (value.user_subs === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_subs: {},
          });
        }
        if (value.user_signed === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_signed: {},
          });
        }
        if (value.profile_status === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            profile_status: true,
          });
        }
      });

    this.getObjByLocaleUserID();

    // this.crudService.handleData('posts').subscribe(data => this.storageService.books = data);

    // this.storageService.books$.subscribe(value => console.log(value))
    // this.storageService.books$.subscribe();

    this.crudService.handleData('posts').subscribe((value) => {
      this.counterObj = value;
      // console.log(value);
      // console.log(...this.counterObj);
    });

    this.initForm();
  }

  // getBooks() {
  //   console.log(this.storageService.books);
  // }

  public addFirebaseToken(): void {
    this.crudService
      .createEntity('picture', {
        img:
          'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg',
      })
      .subscribe((value) => console.log(value));
  }

  public deleteFirebaseToken(): void {
    // this.crudService.createEntity('picture', {img: 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg'}).subscribe(value => console.log(value));
    // this.crudService.createEntity('picture', {model: 'bmv', lastName: 'qweqfqfq'})
    //   .pipe(
    //     tap(value => console.log(value))
    //   )
    //   .subscribe();

    // .pipe(
    // tap(value => console.log(value)),
    // switchMap(value => {
    //   return this.crudService.updateObject('picture', value, {'name': 'test2', 'sur': 'test3'}).pipe(map(() => value))
    // }),
    // switchMap(value => this.crudService.deleteObject('picture', value))

    // this.crudService.handleData('picture').subscribe(value => console.log(value));

    this.crudService.deleteObject('posts', this.counterObj[this.counterObj.length - 1].id);
  }

  public delTappedBaseToken(id): void {
    this.crudService.deleteObject('posts', id);
  }

  public getObjByLocaleUserID(): void {
    this.counter = this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe();
      // .subscribe((value) => console.log(value));
  }

  public trackFunction(index, item): string {
    return item.id;
  }

  onSubmit() {
    const { controls } = this.myFirstReactiveForm;
    if (this.myFirstReactiveForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      return;
    }
    console.log(this.myFirstReactiveForm.value);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  private initForm() {
    this.myFirstReactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[А-яA-z]/)]],
      userTag: ['', [Validators.required, Validators.pattern(/^[A-z _.-]+$/)]],
    });
  }

  public onFileSelected(event): void {
    const file = event.target.files[0];
    combineLatest(this.uploadService.uploadFile('test', file))
      .pipe(
        tap(([percent, link]) => {
          this.progress = percent.toString();
          console.log(link);
          // this.imageLink = link;
        }),
        takeWhile(([percent, link]) => !link),
      )
      .subscribe();
  }

  public postOpen(card, postCreater, postCreaterID, postCreaterAvatar): void {
    const dialogRef = this.dialog.open(PostOpenComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        card,
        postCreater,
        postCreaterID,
        postCreaterAvatar,
      },
    });

    dialogRef.afterClosed().subscribe((value) => {
      console.log('profile token');
      // this.router.navigate(['/feed']);
      this.location.replaceState(`/profile/${this.route.snapshot.params.id}`);
    });
  }
}
