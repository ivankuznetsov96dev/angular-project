import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit {

  // public peoplesID;
  // public postTags;

  @Input() postID: string;
  @Input() postImg: string;
  @Input() postPeoplesID: string;
  @Input() postPostTags: string;

  constructor() { }

  ngOnInit(): void {
    // this.peoplesID.push(this.postPeoplesID.split(','));
    // console.log(this.peoplesID)
  }

}
