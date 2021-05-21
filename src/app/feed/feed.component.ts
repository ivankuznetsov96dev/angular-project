import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { element } from 'protractor';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { CrudService } from '../services/crud.service';
import { UploadService } from '../services/upload.service';
import { StorageService } from '../services/storage.service';
import { Post } from '../services/interfaces/post.model';
import { PostOpenComponent } from '../post-open/post-open.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})

// export interface postsFeed {
//   posts: postElement[];
// }
//
// export interface postElement {
//   id: string;
//   imageLink: string;
//   peoplesID: string;
//   postTags: string;
// }
export class FeedComponent implements OnInit, DoCheck {
  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    console.log(this.route.snapshot.params.post);
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

  public counterUserPosts;

  public userFeed;

  public userSubsArray;

  public subsPosts = [];

  public filtredObj: Post[];

  ngOnInit(): void {
    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => {
    //   this.counterUserPosts = value['user_posts'];
    //   console.log(this.counterUserPosts);
    // });

    // this.filtrPipe();

    this.crudService.handleData('posts').subscribe((value) => {
      this.counterObj = value;
      // console.log(value);
      // console.log(this.counterObj);
      this.filtrPipe();
    });
  }

  ngDoCheck(): void {
    this.postsFilter();
  }

  public filtrPipe() {
    this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe((value) => {
        this.counterUserPosts = value.user_posts;
        console.log(this.counterUserPosts);
        this.userSubsArray = Object.keys(value.user_subs);
        console.log(this.userSubsArray);
        this.concatPostsArray();
      });

    // this.userSubsArray.map((element: string) => {
    //   this.crudService.getObjectByRef('users', element).subscribe((value) => {
    //     console.log(value.user_posts);
    //   });
    // });
  }

  public concatPostsArray() {
    this.userSubsArray.forEach((user) => {
      this.crudService.getObjectByRef('users', user).subscribe((value1) => {
        // console.log(user);
        this.subsPosts = this.subsPosts.concat(value1.user_posts);
        // console.log(this.subsPosts);
      });
    });
  }

  public postsFilter() {
    this.counterUserPosts = this.counterUserPosts.concat(this.subsPosts);
    this.filtredObj = this.counterObj.filter((element) =>
      this.counterUserPosts.includes(element.id),
    );
    // console.log(this.filtredObj)
  }

  public trackFunction(index, item): string {
    return item.id;
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
      console.log('feed token');
      // this.router.navigate(['/feed']);
      this.location.replaceState(`/feed`);
    });
  }

  // public postOpen(card): void {
  //   this.dialog.open(PostOpenComponent, {
  //     data: card,
  //   });
  // }
}
