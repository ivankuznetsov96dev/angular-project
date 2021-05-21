import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Comment } from '../../services/interfaces/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(private crud: CrudService) {}

  @Input() comment: Comment;

  public user_avatar: string;

  public user_name: string;

  public user_email: string;

  ngOnInit(): void {
    this.crud.handleData('users').subscribe(() => {
      this.crud.getObjectByRef('users', this.comment.comment_creater).subscribe((value) => {
        if (value.user_avatar !== '') {
          this.user_avatar = value.user_avatar;
        } else {
          this.user_avatar = value.picture;
        }
        if (value.user_name !== '') {
          this.user_name = value.user_name;
        } else {
          this.user_name = value.name;
        }
        this.user_email = value.email;
      });
    });
  }
}
