import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../services/interfaces/post.model";
import {CrudService} from "../../services/crud.service";

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
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

  constructor(private crudService: CrudService){ }

  ngOnInit(): void {
    // this.peoplesID.push(this.postPeoplesID.split(','));
    // console.log(this.peoplesID)
    console.log(this.card);
    this.crudService.getObjectByRef('users', this.card.userPostCreater).subscribe(value => {
      this.postCreater = value['name'];
      this.postCreaterID = value['email'];
      this.postCreaterAvatar = value['picture'];
    });
  }

}
