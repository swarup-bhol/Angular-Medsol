import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './MedSol/profile/profile.component';

import { NewsFeedComponent } from './MedSol/news-feed/news-feed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MedsolModule } from './Material/medsol/medsol.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './MedSol/Form/login/login.component';
import { SignupComponent } from './MedSol/Form/signup/signup.component';
import { EditProfileComponent } from './MedSol/edit-profile/edit-profile.component';
import { LogoutComponent } from './MedSol/logout/logout.component';

import { PeopleListComponent } from './Medsol/people-list/people-list.component';
import { SnackBarComponent } from './Common/snack-bar/snack-bar.component';
import { InfoComponent } from './MedSol/Form/info/info.component';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MedsolInterceptorService } from './auth/medsol-interceptor.service';
import { PostsComponent } from './MedSol/posts/posts.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NewsFeedComponent,
    LoginComponent,
    SignupComponent,
    EditProfileComponent,
    LogoutComponent,
    PeopleListComponent,
    SnackBarComponent,
    InfoComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MedsolModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MedsolInterceptorService,
      multi: true
    }
  ],
  entryComponents:[LogoutComponent, PostsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
