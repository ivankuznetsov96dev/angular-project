import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, pipe } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormInfoChangerDialogComponent } from './form-info-changer-dialog/form-info-changer-dialog.component';
import { CrudService } from '../../services/crud/crud.service';
import { User } from '../../services/interfaces/user.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  public userInfo: User;

  public user_name: string;

  public user_email: string;

  public user_info: string;

  public user_avatar: string;

  public flagUserInfoChangeBtn = false;

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService,
    private firestoreService: AngularFirestore,
    private route: ActivatedRoute,
  ) {}

  public openDialog(): void {
    this.dialog.open(FormInfoChangerDialogComponent, {
      data: {
        name: this.user_name,
        info: this.user_info,
      },
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.params.id === localStorage.getItem('userLoginID')) {
      this.flagUserInfoChangeBtn = true;
    }

    const postsCollections =
      !localStorage.getItem('currentUserID') ||
      localStorage.getItem('currentUserID') === 'undefined'
        ? localStorage.getItem('userLoginID')
        : localStorage.getItem('currentUserID');

    this.crudService.handleData('users').subscribe(() => {
      this.crudService.getObjectByRef('users', postsCollections).subscribe((value) => {
        this.userInfo = value;
        this.user_email = value.email;
        if (value.user_name !== '') {
          this.user_name = value.user_name;
        } else {
          this.user_name = value.name;
        }
        if (value.user_info !== '') {
          this.user_info = value.user_info;
        }
        if (value.user_avatar !== '') {
          this.user_avatar = value.user_avatar;
        } else {
          this.user_avatar = value.picture;
        }
      });
    });

    // this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => console.log(value))
    // console.log(this.crudService.getObjectByRef('users', localStorage.getItem('userLoginID')).subscribe(value => console.log(value)) !== undefined)

    // this.crudService.getObjectByRef('users', 'nevi.kiv@gmail.com').subscribe(value => console.log(value))
  }
}
