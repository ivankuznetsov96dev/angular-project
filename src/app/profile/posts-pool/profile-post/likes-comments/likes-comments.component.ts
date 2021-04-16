import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from "../../../../services/crud.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-likes-comments',
  templateUrl: './likes-comments.component.html',
  styleUrls: ['./likes-comments.component.scss']
})
export class LikesCommentsComponent implements OnInit {

  @Input() postLikes;
  @Input() postID;

  public likesCounter: number;
  public postCount;

  constructor(private firestoreService: AngularFirestore, private crudService: CrudService) { }

  ngOnInit(): void {
    // console.log(this.postLikes)
    // this.likesCounter = Object.keys(this.postLikes).length;
    // console.log(this.likesCounter)

    this.getLikes();
  }


  // localStorage.getItem('userLoginID')

  public getLikes(): void {
    this.crudService.getObjectByRef('posts', this.postID).subscribe(value => {
      // console.log(value)
      this.postCount = value['likes'];
      console.log(this.postCount);
      this.likesCounter = Object.keys(this.postCount).length;
    });
  }

  public checkLikesCounter(): void {
    // this.crudService.getObjectByRef('posts', this.postID).subscribe(value => {
    //   this.postCount = value['likes'];
    //   console.log(this.counterUserPosts);
    // });

    // this.crudService.getObjectByRef('posts', this.postID).subscribe(value => {
    //   // console.log(value)
    //   this.postCount = value['likes'];
    //   console.log(this.postCount);
    // });


    if (this.postCount[localStorage.getItem('userLoginID')]) {
      delete this.postCount[localStorage.getItem('userLoginID')];
      this.crudService.updateObjectWithUpdate('posts', this.postID, {'likes' : this.postCount});
      this.likesCounter = Object.keys(this.postCount).length;
    } else {
      this.postCount[localStorage.getItem('userLoginID')] = localStorage.getItem('userLoginID');
      this.crudService.updateObjectWithUpdate('posts', this.postID, {'likes' : this.postCount});
      this.likesCounter = Object.keys(this.postCount).length;
    }

    // if (!this.postLikes[`${localStorage.getItem('userLoginID')}`]) {
    //   this.crudService.updateObject('posts', this.postID, {
    //     'likes': `${localStorage.getItem('userLoginID')}`
    //   });
    //   this.likesCounter = Object.keys(this.postLikes).length;
    // }



    // this.firestoreService.collection('posts').doc(this.postID).collection('likes')
    //   .get().pipe(take(1))
    //   .subscribe(value => {
    //     this.postCount = value;
    //     console.log(this.postCount);
    //   })
  }

}
