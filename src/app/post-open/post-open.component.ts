import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { concatMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Post } from '../services/interfaces/post.model';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-post-open',
  templateUrl: './post-open.component.html',
  styleUrls: ['./post-open.component.scss'],
})
export class PostOpenComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private crud: CrudService) {}

  public area_text: string;

  public allComments;

  public filtredComments;

  public user_comments;

  // public comments: {}[];
  //
  // public fullComment = [];

  ngOnInit(): void {
    this.crud.handleData('comments').subscribe((value) => {
      this.allComments = value;
      console.log(this.allComments);
    });

    this.crud.handleData('posts').subscribe(() => {
      this.crud.getObjectByRef('posts', this.data.card.id).subscribe((value) => {
        // this.user_comments = Object.keys(value.comments);
        this.user_comments = value.comments;
        console.log(this.user_comments);
        this.commentsFilter();
        // this.fullComment.splice(0, this.fullComment.length);
        // this.concatMapFunc(this.comments);
      });
    });
  }

  // ngDoCheck(): void {
  //   this.commentsFilter();
  // }

  public commentsFilter(): void {
    this.filtredComments = this.allComments.filter((element) =>
      Object.keys(this.user_comments).includes(element.id),
    );
    console.log(this.filtredComments);
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
    console.log(this.area_text, this.data.card.id);
    this.crud
      .createEntity('comments', {
        post_id: this.data.card.id,
        text: this.area_text,
        comment_creater: localStorage.getItem('userLoginID'),
      })
      .subscribe((value) => {
        this.user_comments[`${value}`] = value;
        this.crud.updateObject('posts', this.data.card.id, { comments: this.user_comments });
      });
  }

  public trackFunction(index, item): string {
    return item.id;
  }
}
