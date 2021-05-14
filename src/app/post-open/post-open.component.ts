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

  public comments: {}[];

  public fullComment = [];

  ngOnInit(): void {
    this.crud.handleData('posts').subscribe((value) => {
      this.crud.getObjectByRef('posts', this.data.card.id).subscribe((value) => {
        this.comments = value.comments;
        console.log(this.comments);
        this.fullComment.splice(0, this.fullComment.length);
        this.concatMapFunc(this.comments);
      });
    });
  }

  public concatMapFunc(array) {
    console.log(this.fullComment);
    for (const param of array) {
      this.crud.getObjectByRef('users', param.user).subscribe((value) => {
        console.log(param);
        this.fullComment.push(Object.assign(param, value));
        console.log(this.fullComment);
      });
    }
  }

  public pressSendBtn(): void {
    console.log(this.area_text, this.data.card.id);
    this.crud.getObjectByRef('posts', this.data.card.id).subscribe(value => {
      const commentsCount = value.comments;
      commentsCount.push({
        user: localStorage.getItem('userLoginID'),
        text: this.area_text,
      });

      this.area_text = '';

      this.crud.updateObjectWithUpdate('posts', this.data.card.id, {
        comments: commentsCount,
      });
    });
  }

  public trackFunction(index, item): string {
    return item.id;
  }
}
