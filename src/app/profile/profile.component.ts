import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { CrudService } from '../services/crud/crud.service';
import { AuthService } from '../services/auth/auth.service';
import { UploadService } from '../services/upload/upload.service';
import { StorageService } from '../services/storage/storage.service';
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

  public profileFlag = false;

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
      this.profileFlag = true;
    }

    if (localStorage.getItem('currentUserID')) {
      this.crudService
        .getObjectByRef('users', localStorage.getItem('currentUserID'))
        .subscribe((value) => {
          if (value === undefined) {
            localStorage.removeItem('currentUserID');
            this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
            // this.location.replaceState(`/profile/${localStorage.getItem('userLoginID')}`);
            // window.location.reload();
            this.profileFlag = true;
          } else {
            this.profileFlag = true;
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

  public counterObj;

  public counter;

  ngOnInit(): void {
    this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe((value) => {
        if (value.user_posts === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_posts: {},
          });
        }
        if (value.user_savePosts === undefined) {
          this.crudService.updateObject('users', localStorage.getItem('userLoginID'), {
            user_savePosts: {},
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
