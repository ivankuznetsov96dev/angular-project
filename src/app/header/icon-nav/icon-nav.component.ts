import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud.service';
import { FormInfoChangerDialogComponent } from '../../profile/profile-info/form-info-changer-dialog/form-info-changer-dialog.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { User } from '../../services/interfaces/user.model';

@Component({
  selector: 'app-icon-nav',
  templateUrl: './icon-nav.component.html',
  styleUrls: ['./icon-nav.component.scss'],
})
export class IconNavComponent implements OnInit {
  public userInfo: User;

  public user_avatar: string;

  public lang = 'en';
  public profileStatus: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private crudService: CrudService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.crudService.handleData('users').subscribe(() => {
      this.crudService
        .getObjectByRef('users', localStorage.getItem('userLoginID'))
        .subscribe((value) => {
          this.userInfo = value;
          if (value.user_avatar !== '') {
            this.user_avatar = value.user_avatar;
          } else {
            this.user_avatar = value.picture;
          }
          this.profileStatus = value.profile_status;
        });
    });
  }

  profileStatusChanger() {
    this.profileStatus = !this.profileStatus;
    this.crudService
      .updateObject('users', localStorage.getItem('userLoginID'), {
        profile_status: this.profileStatus,
      })
      .subscribe((value) => {
        window.location.reload();
      });
  }

  public logOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['/login']));
    // localStorage.clear();
  }

  public goToFeed(): void {
    this.router.navigate(['/feed']);
  }

  public goToProfile(): void {
    localStorage.removeItem('currentUserID');
    console.log(this.router.url);

    if (this.router.url === '/profile') {
      window.location.reload();
    } else {
      this.router.navigate(['/profile']);
    }
    // localStorage.removeItem('currentUserID');
    // console.log(this.router.url);

    // if (localStorage.getItem('userLoginID') === localStorage.getItem('currentUserID')) {
    //   localStorage.removeItem('currentUserID');
    // }


    // this.router.navigate(['/profile']);
    // window.location.reload();

    // if (this.router.url === `/profile/${localStorage.getItem('currentUserID')}`) {
    //   // this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
    //   console.log('значение верно');
    //   localStorage.removeItem('currentUserID');
    //   // this.router.url = `/profile/${localStorage.getItem('userLoginID')}`;
    //   // window.location.reload();
    // } else {
    //   console.log('значение не верно');
    // }

    // if (this.router.url === `/profile/${localStorage.removeItem('currentUserID')}`) {
    //   // this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
    //   localStorage.removeItem('currentUserID');
    //   window.location.reload();
    // } else {
    //   this.router.navigate(['/profile', localStorage.getItem('userLoginID')]);
    // }

    // const count = window.location.href.split('/');
    // if (count[count.length - 1] === 'profile') {
    //   window.location.reload();
    // } else {
    //   this.router.navigate(['/profile']);
    // }

    // localStorage.removeItem('currentUserID');
    // this.router.navigate(['/profile']);
    // window.location.reload();
    // console.log(count[count.length - 1]);
  }

  public openDialog(): void {
    this.dialog.open(CreatePostComponent);
  }
}
