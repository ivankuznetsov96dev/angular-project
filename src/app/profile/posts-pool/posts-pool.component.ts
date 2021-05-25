import {
  Component,
  OnInit,
  DoCheck,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud/crud.service';
import { UploadService } from '../../services/upload/upload.service';
import { StorageService } from '../../services/storage/storage.service';
import { Post } from '../../services/interfaces/post.model';
import { PostOpenComponent } from '../../post-open/post-open.component';

@Component({
  selector: 'app-posts-pool',
  templateUrl: './posts-pool.component.html',
  styleUrls: ['./posts-pool.component.scss'],
})
// export class PostsPoolComponent implements OnInit {
export class PostsPoolComponent implements OnInit, DoCheck {
  public counterObj;

  public profileStatus: boolean;

  public counterUserPosts;

  public addTag;

  public filtredObj: Post[];

  public filtredObjSave: Post[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private location: Location,
  ) {}

  ngOnInit(): void {
    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => {
    //   this.counterUserPosts = value['user_posts'];
    //   console.log(this.counterUserPosts);
    // });
    // this.filtrPipe();

    this.crudService.handleData('posts').subscribe((value) => {
      this.counterObj = value;
      this.filtrPipe();
    });
  }

  ngDoCheck() {
    this.storageService.tag$.subscribe((value) => {
      if (value !== null) {
        this.addTag = value;
        const count = this.filtredObj;
        const newCount = count.filter((element) => this.addTag.includes(element.postTags));
        this.filtredObj = newCount;
      } else {
        this.filtredObj = this.filtredObjSave;
      }
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.storageService.tag$.subscribe((value) => console.log(value));
  // }

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

    // console.log(postsCollections);
    this.crudService.getObjectByRef('users', postsCollections).subscribe((value) => {
      if (postsCollections === localStorage.getItem('currentUserID')) {
        this.profileStatus = value.profile_status;
      } else {
        this.profileStatus = true;
      }
      // this.counterUserPosts = value.user_posts;
      this.counterUserPosts = Object.keys(value.user_posts);
      // console.log(this.counterUserPosts);
      this.postsFilter();
    });
  }

  public postsFilter() {
    const filtredComments = this.counterObj.filter((element) =>
      this.counterUserPosts.includes(element.id),
    );
    this.filtredObj = filtredComments.sort(function (prev, next) {
      return next.postTime - prev.postTime;
    });
    this.filtredObjSave = this.filtredObj;
    // console.log(this.filtredObj)
  }

  public trackFunction(index, item): string {
    return item.id;
  }

  public postOpen(card): void {
    this.location.replaceState(`/profile/${this.route.snapshot.params.id}/${card.id}`);
    let postCreater;
    let postCreaterID;
    let postCreaterAvatar;

    this.crudService.getObjectByRef('users', card.userPostCreater).subscribe((value) => {
      postCreaterID = value.email;
      if (value.user_avatar !== '') {
        postCreaterAvatar = value.user_avatar;
      } else {
        postCreaterAvatar = value.picture;
      }
      if (value.user_name !== '') {
        postCreater = value.user_name;
      } else {
        postCreater = value.name;
      }

      const dialogRef = this.dialog.open(PostOpenComponent, {
        panelClass: 'app-full-bleed-dialog',
        data: {
          card,
          postCreater,
          postCreaterID,
          postCreaterAvatar,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('post-pool token');
        this.location.replaceState(`/profile/${this.route.snapshot.params.id}`);
      });
    });
  }
}
