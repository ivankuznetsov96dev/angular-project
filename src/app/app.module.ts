import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from "../environments/environment";
import { HeaderComponent } from './header/header.component';
import { IconNavComponent } from './header/icon-nav/icon-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePostComponent } from './profile/posts-pool/profile-post/profile-post.component';
import { PostsPoolComponent } from './profile/posts-pool/posts-pool.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfileImgComponent } from './profile/profile-info/profile-img/profile-img.component';
import { FollowBtnComponent } from './profile/profile-info/follow-btn/follow-btn.component';
import { ProfileInfoCountersComponent } from './profile/profile-info/profile-info-counters/profile-info-counters.component';
import { PostsListsComponent } from './posts-lists/posts-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IconNavComponent,
    ProfileComponent,
    ProfilePostComponent,
    PostsPoolComponent,
    ProfileInfoComponent,
    ProfileImgComponent,
    FollowBtnComponent,
    ProfileInfoCountersComponent,
    PostsListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
