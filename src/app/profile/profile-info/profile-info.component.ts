import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, pipe, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormInfoChangerDialogComponent } from './form-info-changer-dialog/form-info-changer-dialog.component';
import { CrudService } from '../../services/crud/crud.service';
import { User } from '../../services/interfaces/user.model';
import { PostsPoolComponent } from '../posts-pool/posts-pool.component';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit, OnChanges {
  public userInfo: User;

  @Input() flag: boolean;

  public user_name = '';

  public user_email = '';

  public user_info = '';

  public user_avatar = '';

  public flagUserInfoChangeBtn = false;

  public userChange: boolean;

  public subsOnDestroy: Subscription;

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService,
    private firestoreService: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // this.router.events.subscribe((value) => console.log(value));
  }

  public openDialog(): void {
    this.dialog.open(FormInfoChangerDialogComponent, {
      data: {
        name: this.user_name,
        info: this.user_info,
      },
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.router.events
  //     .pipe(filter((e) => e instanceof NavigationEnd))
  //     .subscribe((s: NavigationEnd) => {
  //       // console.log(s);
  //       if (this.subsOnDestroy !== undefined) {
  //         this.subsOnDestroy.unsubscribe();
  //       }
  //       this.user_name = '';
  //       this.user_email = '';
  //       this.user_info = '';
  //       this.user_avatar = '';
  //       this.userInfo = null;
  //       const count = s.url.split('/');
  //       if (count[count.length - 1] !== localStorage.getItem('userLoginID')) {
  //         localStorage.setItem('currentUserID', count[count.length - 1]);
  //       } else {
  //         localStorage.removeItem('currentUserID');
  //       }
  //       console.log(s.id);
  //       this.initFormFunc();
  //       this.poolComponent.startInit();
  //       // console.log(this.user_name, this.user_email, this.user_avatar);
  //     });
  //
  //   this.user_name = '';
  //   this.user_email = '';
  //   this.user_info = '';
  //   this.user_avatar = '';
  //   this.userInfo = null;
  //   console.log(localStorage.getItem('currentUserID'));
  //   if (this.flag === true) {
  //     this.initFormFunc();
  //   }
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (this.flag === true) {
      this.initFormFunc();
    }
  }

  ngOnInit(): void {
    // console.log(this.flag);
    if (this.flag === true) {
      this.initFormFunc();
    }

    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => console.log(value))
    // console.log(this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => console.log(value)) !== undefined)

    // this.crudService.getObjectByRef('users', 'nevi.kiv@gmail.com').subscribe(value => console.log(value))
  }

  public initFormFunc() {
    if (this.route.snapshot.params.id === localStorage.getItem('userLoginID')) {
      this.flagUserInfoChangeBtn = true;
      this.userChange = null;
      this.userChange = false;
    } else {
      this.flagUserInfoChangeBtn = false;
      this.userChange = null;
      this.userChange = true;
    }

    const postsCollections =
      !localStorage.getItem('currentUserID') ||
      localStorage.getItem('currentUserID') === 'undefined'
        ? localStorage.getItem('userLoginID')
        : localStorage.getItem('currentUserID');

    this.subsOnDestroy = this.crudService.handleData('users').subscribe(() => {
      this.crudService.getObjectByRef('users', postsCollections).subscribe((value) => {
        this.userInfo = value;
        this.user_email = value.email;
        if (value.user_name !== '') {
          this.user_name = value.user_name;
        } else {
          this.user_name = value.name;
        }
        if (value.user_info !== '') {
          this.user_info = value.user_info;
        }
        if (value.user_avatar !== '') {
          this.user_avatar = value.user_avatar;
        } else {
          this.user_avatar = value.picture;
        }
      });
    });
  }
}
