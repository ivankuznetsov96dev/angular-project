import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {


  @Input()
  postImg: string;

  @Input()
  postID: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.postID)
  }

}
