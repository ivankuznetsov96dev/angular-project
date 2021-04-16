import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../services/interfaces/post.model";

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit {

  // public peoplesID;
  // public postTags;

  @Input() card: Post;

  // @Input() postID: string;
  // @Input() postImg: string;
  // @Input() postPeoplesID: string;
  // @Input() postPostTags: string;

  constructor() { }

  ngOnInit(): void {
    // this.peoplesID.push(this.postPeoplesID.split(','));
    // console.log(this.peoplesID)

    console.log(this.card);
  }

}
