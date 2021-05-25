import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../services/interfaces/user.model';
import { CrudService } from '../../../services/crud/crud.service';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html',
  styleUrls: ['./follow-btn.component.scss'],
})
export class FollowBtnComponent implements OnInit {
  @Input() user: User;

  public btnStatus;

  public subsCount: boolean;

  public currentSubsCount;

  public btnFlag: string;

  constructor(private crud: CrudService) {}

  ngOnInit(): void {
    this.btnStatus = false;
    this.crud.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe((value) => {
      this.subsCount = value.user_subs;
      this.changerBtnFlag();
    });
    this.crud.getObjectByRef('users', localStorage.getItem('currentUserID')).subscribe((value) => {
      this.currentSubsCount = value.user_signed;
      this.btnStatus = true;
      console.log(value);
      console.log(this.currentSubsCount);
    });
  }

  public changerBtnFlag() {
    if (this.subsCount[localStorage.getItem('currentUserID')]) {
      this.btnFlag = 'signed';
    } else {
      this.btnFlag = 'follow';
    }
  }

  public pressFollowBtn(): void {
    // console.log(this.user);
    // console.log(this.subsCount);

    if (this.subsCount[localStorage.getItem('currentUserID')]) {
      delete this.subsCount[localStorage.getItem('currentUserID')];
      this.crud.updateObjectWithUpdate('users', localStorage.getItem('userLoginID'), {
        user_subs: this.subsCount,
      });
      this.changerBtnFlag();
      delete this.currentSubsCount[localStorage.getItem('userLoginID')];
      this.crud.updateObjectWithUpdate('users', localStorage.getItem('currentUserID'), {
        user_signed: this.currentSubsCount,
      });
      console.log(this.currentSubsCount);
      // console.log(this.subsCount);
    } else {
      this.subsCount[localStorage.getItem('currentUserID')] = localStorage.getItem('currentUserID');
      this.crud.updateObjectWithUpdate('users', localStorage.getItem('userLoginID'), {
        user_subs: this.subsCount,
      });
      this.changerBtnFlag();
      this.currentSubsCount[localStorage.getItem('userLoginID')] = localStorage.getItem('userLoginID');
      this.crud.updateObjectWithUpdate('users', localStorage.getItem('currentUserID'), {
        user_signed: this.currentSubsCount,
      });
      console.log(this.currentSubsCount);
      // console.log(this.subsCount);
    }

    // if (this.postCount[localStorage.getItem('userLoginID')]) {
    //   delete this.postCount[localStorage.getItem('userLoginID')];
    //   this.crudService.updateObjectWithUpdate('posts', this.postID, { likes: this.postCount });
    //   this.likesCounter = Object.keys(this.postCount).length;
    //   this.changerBtnColor();
    // } else {
    //   this.postCount[localStorage.getItem('userLoginID')] = localStorage.getItem('userLoginID');
    //   this.crudService.updateObjectWithUpdate('posts', this.postID, { likes: this.postCount });
    //   this.likesCounter = Object.keys(this.postCount).length;
    //   this.changerBtnColor();
    // }
  }
}
