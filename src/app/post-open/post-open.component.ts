import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { concatMap, tap } from 'rxjs/operators';
import { from, of, Subject, Subscription } from 'rxjs';
import { formatDate, Location } from '@angular/common';
import { Post } from '../services/interfaces/post.model';
import { CrudService } from '../services/crud/crud.service';

@Component({
  selector: 'app-post-open',
  templateUrl: './post-open.component.html',
  styleUrls: ['./post-open.component.scss'],
})
export class PostOpenComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crud: CrudService,
    private dialog: MatDialog,
    private location: Location,
  ) {}

  public area_text: string;

  public allComments;

  public sortedAndFiltredComments;

  public user_comments;

  public postSettingsFlag = false;

  public postTimeData;

  public postDeleteFlag: boolean;

  // public comments: {}[];
  //
  // public fullComment = [];

  ngOnInit(): void {
    if (this.data.postCreaterID === localStorage.getItem('userLoginID')) {
      this.postSettingsFlag = true;
    }
    this.postTimeData = formatDate(this.data.card.postTime.toDate(), 'MMM d, y, h:mm a', 'en-US');

    this.crud.handleData('comments').subscribe((value) => {
      this.allComments = value;
      // console.log(this.allComments);
    });

    this.crud.handleData('posts').subscribe((val) => {
      this.checkLivePost(val);
      this.crud.getObjectByRef('posts', this.data.card.id).subscribe((value) => {
        // this.user_comments = Object.keys(value.comments);
        this.user_comments = value.comments;
        // console.log(value);
        // console.log(this.user_comments);
        this.commentsFilter();
        // this.fullComment.splice(0, this.fullComment.length);
        // this.concatMapFunc(this.comments);
      });
    });
  }

  public checkLivePost(array) {
    this.postDeleteFlag = array.some((obj) => {
      return obj.id === this.data.card.id;
    });
    if (this.postDeleteFlag === false) {
      // console.log('post deleted');
      this.dialog.closeAll();
    }
  }

  public commentsFilter(): void {
    const filtredComments = this.allComments.filter((element) =>
      Object.keys(this.user_comments).includes(element.id),
    );
    // console.log(filtredComments);
    this.sortedAndFiltredComments = filtredComments.sort(function (prev, next) {
      return next.time - prev.time;
    });
    // console.log(this.sortedAndFiltredComments);
  }

  // public concatMapFunc(array) {
  //   console.log(this.fullComment);
  //   for (const param of array) {
  //     this.crud.getObjectByRef('users', param.user).subscribe((value) => {
  //       console.log(param);
  //       this.fullComment.push(Object.assign(param, value));
  //       console.log(this.fullComment);
  //     });
  //   }
  // }
  //
  // public pressSendBtn(): void {
  //   console.log(this.area_text, this.data.card.id);
  //   this.crud.getObjectByRef('posts', this.data.card.id).subscribe(value => {
  //     const commentsCount = value.comments;
  //     commentsCount.push({
  //       user: localStorage.getItem('userLoginID'),
  //       text: this.area_text,
  //     });
  //
  //     this.area_text = '';
  //
  //     this.crud.updateObjectWithUpdate('posts', this.data.card.id, {
  //       comments: commentsCount,
  //     });
  //   });
  // }

  public pressSendBtn(): void {
    // console.log(this.area_text, this.data.card.id);
    this.crud
      .createEntity('comments', {
        time: new Date(),
        post_id: this.data.card.id,
        text: this.area_text,
        comment_creater: localStorage.getItem('userLoginID'),
      })
      .subscribe((value) => {
        this.user_comments[`${value}`] = value;
        this.crud.updateObject('posts', this.data.card.id, { comments: this.user_comments });
        this.area_text = '';
      });
  }

  public moveOnProfile(id): void {
    this.dialog.closeAll();
    this.location.replaceState(`/profile/${id}`);
    window.location.reload();
  }

  public deletePost(): void {
    this.crud.getObjectByRef('users', this.data.postCreaterID).subscribe((value) => {
      const count = value.user_posts;
      delete count[`${this.data.card.id}`];
      this.crud.updateObjectWithUpdate('users', this.data.postCreaterID, { user_posts: count });
    });
    this.crud.deleteObject('posts', this.data.card.id).subscribe(() => {
      this.dialog.closeAll();
    });
  }

  public trackFunction(index, item): string {
    return item.id;
  }
}
