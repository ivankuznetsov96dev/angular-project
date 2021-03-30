import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  // public inputSubject: Subject<any> = new Subject<any>();
  // public subscriptions: Subscription[] = [];

  ngOnInit(): void {
  }

}
