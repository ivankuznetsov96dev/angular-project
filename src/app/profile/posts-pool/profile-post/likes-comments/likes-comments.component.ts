import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CrudService } from '../../../../services/crud/crud.service';

@Component({
  selector: 'app-likes-comments',
  templateUrl: './likes-comments.component.html',
  styleUrls: ['./likes-comments.component.scss'],
})
export class LikesCommentsComponent implements OnInit, OnDestroy {
  @Input() postLikes;

  @Input() postID;

  public likesCounter: number;

  public postCount;

  public commentsCounter;

  public colorCounter: boolean;

  public test;

  public dest: Subscription;

  constructor(private firestoreService: AngularFirestore, private crudService: CrudService) {}

  ngOnInit(): void {
    this.dest = this.crudService.handleData('posts').subscribe(() => {
      this.getLikes();
    });
  }

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
  }

  ngOnDestroy(): void {
    this.dest.unsubscribe();
  }
}
