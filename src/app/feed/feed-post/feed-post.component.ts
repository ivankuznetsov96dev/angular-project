import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../services/interfaces/post.model';
import { CrudService } from '../../services/crud.service';
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

  public postCreater: string;

  public postCreaterID: string;

  public postCreaterAvatar: string;

  // @Input() postID: string;
  // @Input() postImg: string;
  // @Input() postPeoplesID: string;
  // @Input() postPostTags: string;

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.peoplesID.push(this.postPeoplesID.split(','));
    // console.log(this.peoplesID)
    console.log(this.card);
    this.getUserInfo();
  }

  public getUserInfo(): void {
    this.crudService.getObjectByRef('users', this.card.userPostCreater).subscribe((value) => {
      this.postCreater = value.name;
      this.postCreaterID = value.email;
      this.postCreaterAvatar = value.picture;
    });
  }

  public postOpen(card, postCreater, postCreaterID, postCreaterAvatar): void {
    this.dialog.open(PostOpenComponent, {
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
    // this.router.navigate(['/feed/p/', this.card.id]);
    // this.router.navigateByUrl(`/feed/p/${this.card.id}`);
  }

  public redirectOnSlectedUserProfile(id): void {
    console.log(id);
    // localStorage.setItem('currentUserID', id);
    console.log(this.router.url);
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
}
