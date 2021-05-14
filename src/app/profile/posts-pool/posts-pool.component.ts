import { Component, OnInit, DoCheck, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud.service';
import { UploadService } from '../../services/upload.service';
import { StorageService } from '../../services/storage.service';
import { Post } from '../../services/interfaces/post.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { PostOpenComponent } from '../../post-open/post-open.component';

@Component({
  selector: 'app-posts-pool',
  templateUrl: './posts-pool.component.html',
  styleUrls: ['./posts-pool.component.scss'],
})
export class PostsPoolComponent implements OnInit, DoCheck {
  public counterObj;

  public profileStatus: boolean;

  public counterUserPosts;

  public filtredObj: Post[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => {
    //   this.counterUserPosts = value['user_posts'];
    //   console.log(this.counterUserPosts);
    // });
    this.filtrPipe();

    this.crudService.handleData('posts').subscribe((value) => {
      this.counterObj = value;
      console.log(value);
      console.log(this.counterObj);
      this.filtrPipe();
    });
  }

  ngDoCheck(): void {
    this.postsFilter();
  }

  public filtrPipe() {
    // let postsCollections: string;
    // if (
    //   !localStorage.getItem('currentUserID') ||
    //   localStorage.getItem('currentUserID') === 'undefined'
    // ) {
    //   postsCollections = localStorage.getItem('userLoginID');
    // } else {
    //   postsCollections = localStorage.getItem('userLoginID');
    //   localStorage.removeItem('currentUserID');
    // }

    const postsCollections =
      !localStorage.getItem('currentUserID') ||
      localStorage.getItem('currentUserID') === 'undefined'
        ? localStorage.getItem('userLoginID')
        : localStorage.getItem('currentUserID');

    // localStorage.removeItem('currentUserID');

    console.log(postsCollections);
    this.crudService.getObjectByRef('users', postsCollections).subscribe((value) => {
      if (postsCollections === localStorage.getItem('currentUserID')) {
        this.profileStatus = value.profile_status;
      } else {
        this.profileStatus = true;
      }
      this.counterUserPosts = value.user_posts;
      console.log(this.counterUserPosts);
    });
  }

  public postsFilter() {
    this.filtredObj = this.counterObj.filter((element) =>
      this.counterUserPosts.includes(element.id),
    );
    // console.log(this.filtredObj)
  }

  public trackFunction(index, item): string {
    return item.id;
  }

  public postOpen(card): void {
    let postCreater;
    let postCreaterID;
    let postCreaterAvatar;

    this.crudService.getObjectByRef('users', card.userPostCreater).subscribe((value) => {
      postCreater = value.name;
      postCreaterID = value.email;
      postCreaterAvatar = value.picture;

      this.dialog.open(PostOpenComponent, {
        panelClass: 'app-full-bleed-dialog',
        data: {
          card,
          postCreater,
          postCreaterID,
          postCreaterAvatar,
        },
      });
    });
  }
}
