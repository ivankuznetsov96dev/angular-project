import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-icon-nav',
  templateUrl: './icon-nav.component.html',
  styleUrls: ['./icon-nav.component.scss']
})
export class IconNavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  public logOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['/login']));
  }

  ngOnInit(): void {
  }

}
