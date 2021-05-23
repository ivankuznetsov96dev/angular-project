import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../services/interfaces/post.model';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
})
export class ProfilePostComponent implements OnInit {
  @Input()
  post: Post;

  public postID: string;

  public postImg: string;

  constructor() {}

  ngOnInit(): void {
    this.postID = this.post.id;
    this.postImg = this.post.imageLink;
    // console.log(this.postID);
  }
}
