import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { Post } from '../../services/interfaces/post.model';
import { CrudService } from '../../services/crud/crud.service';
import { PostOpenComponent } from '../../post-open/post-open.component';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss'],
})
export class FeedPostComponent implements OnInit {
  // public peoplesID;
  // public postTags;

  @Input() card: Post;

  public imgFlag = false;

  public colorCounter = false;

  public postCreater: string;

  public postCreaterID: string;

  public postCreaterAvatar: string;

  public postTime;

  public postTimeData;

  // @Input() postID: string;
  // @Input() postImg: string;
  // @Input() postPeoplesID: string;
  // @Input() postPostTags: string;

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    // this.peoplesID.push(this.postPeoplesID.split(','));
    // console.log(this.peoplesID)
    // console.log(this.card);
    setTimeout(() => {
      this.imgFlag = true;
    }, 1000);
    this.getUserInfo();
  }

  public getUserInfo(): void {
    this.crudService.handleData('users').subscribe(() => {
      this.crudService.getObjectByRef('users', this.card.userPostCreater).subscribe((value) => {
        if (value.user_name !== '') {
          this.postCreater = value.user_name;
        } else {
          this.postCreater = value.name;
        }

        this.postCreaterID = value.email;
        this.postTime = this.card.postTime;
        this.postTimeData = formatDate(this.card.postTime.toDate(), 'MMM d, y, h:mm a', 'en-US');

        if (value.user_avatar !== '') {
          this.postCreaterAvatar = value.user_avatar;
        } else {
          this.postCreaterAvatar = value.picture;
        }
        // this.postCreater = value.name;
        // this.postCreaterID = value.email;
        // this.postCreaterAvatar = value.picture;
      });
    });
  }

  public postOpen(card, postCreater, postCreaterID, postCreaterAvatar): void {
    // this.router.navigateByUrl(`/feed/${this.card.id}`);
    // this.router.navigate([`/feed/${this.card.id}`]);
    this.location.replaceState(`/feed/${this.card.id}`);
    const dialogRef = this.dialog.open(PostOpenComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        // card: this.card,
        // postCreater: this.postCreater,
        // postCreaterID: this.postCreaterID,
        // postCreaterAvatar: this.postCreaterAvatar,
        card,
        postCreater,
        postCreaterID,
        postCreaterAvatar,
      },
    });

    dialogRef.afterClosed().subscribe((value) => {
      // console.log('token feed-post');
      // console.log(this.route.snapshot.params);
      // console.log(this.router.url);
      if (this.router.url === `/feed/${this.route.snapshot.params.post}`) {
        this.location.replaceState(`/feed`);
      }
      // this.router.navigate(['/feed']);
    });
    // this.router.navigate(['/feed/p/', this.card.id]);
    // this.router.navigateByUrl(`/feed/p/${this.card.id}`);
  }

  public redirectOnSlectedUserProfile(id): void {
    // console.log(id);
    // localStorage.setItem('currentUserID', id);
    // console.log(this.router.url);
    this.router.navigate(['/profile', id]);

    // if (localStorage.getItem('userLoginID') === localStorage.getItem('currentUserID')) {
    //   localStorage.removeItem('currentUserID');
    // }

    // if (this.router.url === '/feed') {
    // this.router.navigate(['/profile', localStorage.getItem('currentUserID')]);
    // window.location.reload();
    // }
    // } else {
    //   window.location.reload();
    // }
  }

  // public savePost() {
  //   this.colorCounter = !this.colorCounter;
  // }
}
