import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {CrudService} from "../../services/crud.service";
import {FormInfoChangerDialogComponent} from "../../profile/profile-info/form-info-changer-dialog/form-info-changer-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostComponent} from "./create-post/create-post.component";

@Component({
  selector: 'app-icon-nav',
  templateUrl: './icon-nav.component.html',
  styleUrls: ['./icon-nav.component.scss']
})
export class IconNavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private crudService: CrudService, private dialog: MatDialog) { }

  public logOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['/login']));
    localStorage.clear();
  }

  public goToFeed(): void {
    this.router.navigate(['/feed']);
  }

  public goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  public openDialog(): void {
    this.dialog.open(CreatePostComponent);
  }

  ngOnInit(): void {
  }

}
