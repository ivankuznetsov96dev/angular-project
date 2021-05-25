import { Component, Input, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../../services/crud/crud.service';
import { Comment } from '../../services/interfaces/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(
    private crud: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,
  ) {}

  @Input() comment: Comment;

  @Input() postCreaterID: string;

  public commentSettingsFlag = false;

  public user_avatar: string;

  public user_name: string;

  public user_email: string;

  public comment_time;

  public today;

  ngOnInit(): void {
    this.crud.handleData('users').subscribe(() => {
      this.crud.getObjectByRef('users', this.comment.comment_creater).subscribe((value) => {
        // this.comment_time = this.comment.time.toDate();
        this.comment_time = formatDate(this.comment.time.toDate(), 'MMM d, y, h:mm a', 'en-US');
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

        if (
          this.user_email === localStorage.getItem('userLoginID') ||
          this.postCreaterID === localStorage.getItem('userLoginID')
        ) {
          this.commentSettingsFlag = true;
        }
        // this.commentSettingsFlag = true;

        // this.comment_time = value.time.toDate();
        // console.log(this.comment_time);
        // this.comment_time = formatDate(value.time, 'MMM d, y, h:mm a', 'en-US');
        // console.log(this.comment_time);
      });
    });
  }

  public deleteComment(): void {
    // console.log(this.comment.id);
    // console.log(this.user_email);
    // console.log('sodatel posta: '+this.postCreaterID);
    // console.log('post: '+this.comment.post_id);

    this.crud.getObjectByRef('posts', this.comment.post_id).subscribe((value) => {
      const commentsMapCount = value.comments;
      delete commentsMapCount[this.comment.id];
      // console.log(commentsMapCount);
      this.crud
        .updateObjectWithUpdate('posts', this.comment.post_id, { comments: commentsMapCount })
        .subscribe(() => {
          this.crud.deleteObject('comments', this.comment.id);
        });
    });
  }

  public moveOnProfile(id): void {
    this.dialog.closeAll();
    this.location.replaceState(`/profile/${id}`);
    window.location.reload();
    // this.router.navigate(['/profile', id]);
  }
}
