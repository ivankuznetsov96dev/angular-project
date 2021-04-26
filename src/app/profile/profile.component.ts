import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { AuthService } from '../services/auth/auth.service';
import { UploadService } from '../services/upload.service';
import { StorageService } from '../services/storage.service';

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
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
  ) {}

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
            user_posts: [],
          });
        }
        if (value.user_avatar === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_avatar: '',
          });
        }
        if (value.user_subs === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_subs: {},
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

  getBooks() {
    console.log(this.storageService.books);
  }

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
      .subscribe((value) => console.log(value));
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
}
