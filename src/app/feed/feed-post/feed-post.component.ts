import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../services/interfaces/post.model';
import { CrudService } from '../../services/crud.service';
import {MatDialog} from "@angular/material/dialog";
import {PostOpenComponent} from "../../post-open/post-open.component";

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

  constructor(private crudService: CrudService, private dialog: MatDialog) {}

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

  public postOpen(): void {
    this.dialog.open(PostOpenComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        card: this.card,
        postCreater: this.postCreater,
        postCreaterID: this.postCreaterID,
        postCreaterAvatar: this.postCreaterAvatar,
      },
    });
  }
}
