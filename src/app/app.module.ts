import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { LikesCommentsComponent } from './profile/posts-pool/profile-post/likes-comments/likes-comments.component';

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
    LoginComponent,
    LikesCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
