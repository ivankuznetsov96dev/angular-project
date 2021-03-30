import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router, private authService: AuthService) { }

  public eventCounter: string[] = ['container', 'right-panel-active'];

  public openSignInPanel(): void {
    this.eventCounter.pop();
  }

  public openSignUpPanel(): void {
    this.eventCounter.push('right-panel-active');
  }

  ngOnInit(): void {
  }

  public goTo(): void {
    this.authService.googleSign().subscribe(() => {
      this.router.navigate(['/profile'])});
  }

}
