import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { CrudService } from '../../../../services/crud/crud.service';

@Component({
  selector: 'app-likes-comments',
  templateUrl: './likes-comments.component.html',
  styleUrls: ['./likes-comments.component.scss'],
})
export class LikesCommentsComponent implements OnInit {
  @Input() postLikes;

  @Input() postID;

  public likesCounter: number;

  public postCount;

  public commentsCounter;

  public colorCounter: boolean;

  public test;

  constructor(private firestoreService: AngularFirestore, private crudService: CrudService) {}

  ngOnInit(): void {
    // console.log(this.postLikes)
    // this.likesCounter = Object.keys(this.postLikes).length;
    // console.log(this.likesCounter)

    // this.test = this.firestoreService.collection('posts').doc(this.postID).valueChanges();
    // this.test.subscribe((value) => console.log(value));

    // this.crudService.getHandleData('posts', this.postID).subscribe((value) => {
    //   this.test = Object.keys(value[0]['likes']).length;
    //   console.log(this.test);
    // });

    this.crudService.handleData('posts').subscribe(() => {
      this.getLikes();
    });

    // this.getLikes();
  }

  // localStorage.getItem('userLoginID')

  public getLikes(): void {
    this.crudService.getObjectByRef('posts', this.postID).subscribe((value) => {
      this.postCount = value.likes;
      this.likesCounter = Object.keys(this.postCount).length;
      this.commentsCounter = Object.keys(value.comments).length;
      this.changerBtnColor();
    });
  }

  public changerBtnColor() {
    if (this.postCount[localStorage.getItem('userLoginID')]) {
      // console.log(this.postCount[localStorage.getItem('userLoginID')]);
      this.colorCounter = true;
      // console.log(this.colorCounter);
    } else {
      // console.log(this.postCount[localStorage.getItem('userLoginID')]);
      this.colorCounter = false;
      // console.log(this.colorCounter);
    }
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
      this.crudService.updateObjectWithUpdate('posts', this.postID, { likes: this.postCount });
      this.likesCounter = Object.keys(this.postCount).length;
      this.changerBtnColor();
    } else {
      this.postCount[localStorage.getItem('userLoginID')] = localStorage.getItem('userLoginID');
      this.crudService.updateObjectWithUpdate('posts', this.postID, { likes: this.postCount });
      this.likesCounter = Object.keys(this.postCount).length;
      this.changerBtnColor();
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
