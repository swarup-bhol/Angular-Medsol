import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './MedSol/profile/profile.component';
import { EditProfileComponent } from './MedSol/edit-profile/edit-profile.component';
import { NewsFeedComponent } from './MedSol/news-feed/news-feed.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { LoginGuard } from './auth/guard/login.guard';
import { InfoComponent } from './MedSol/Form/info/info.component';
import { PeopleListComponent } from './Medsol/people-list/people-list.component';



const routes: Routes = [
  { path: '',component: HomeComponent ,canActivate: [LoginGuard]},
  { path: 'login', component: HomeComponent ,canActivate: [LoginGuard]},
  { path: 'login/info/:username', component: InfoComponent},
  { path: 'profile/:id', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent ,canActivate: [AuthGuard]},
  { path: 'feeds', component: NewsFeedComponent, canActivate: [AuthGuard] },
  {path: 'peoples/:details/:id', component:PeopleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
