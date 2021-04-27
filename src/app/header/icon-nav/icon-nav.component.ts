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

  public lang = 'en';

  constructor(
    private router: Router,
    private authService: AuthService,
    private crudService: CrudService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.crudService
      .getObjectByRef('users', localStorage.getItem('userLoginID'))
      .subscribe((value) => {
        this.userInfo = value;
        console.log(this.userInfo);
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
