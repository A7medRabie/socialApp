import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { TimelineComponent } from './features/pages/timeline/timeline.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { PostDetailsComponent } from './features/pages/post-details/post-details.component';
import { ChangePasswordComponent } from './features/pages/auth/change-password/change-password.component';
import { LoginComponent } from './features/pages/auth/login/login.component';
import { RegisterComponent } from './features/pages/auth/register/register.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'timeline', pathMatch: 'full' },
    {path:"",component:MainLayoutComponent,children:[
        {path:'timeline',component: TimelineComponent, title: 'Timeline page' },    
        {path: 'profile', component: ProfileComponent, title: 'Profile page' },
        {path: 'details', component: PostDetailsComponent, title: 'Details page' }, 
        {path: 'changePassword', component: ChangePasswordComponent, title: 'Change password page' },
    ]},
      {path:"",component:AuthLayoutComponent,children:[
        {path: 'login', component: LoginComponent, title: 'Login page' },
        {path: 'register', component: RegisterComponent, title: 'Register page' },
    ]},
    {path: '**', component:NotFoundComponent, title: 'Not Found' },
];
