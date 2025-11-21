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
import { SettingsComponent } from './features/pages/settings/settings.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'timeline', pathMatch: 'full' },
    {path:"",component:MainLayoutComponent,canActivate:[authGuard],children:[
        {path:'timeline',component: TimelineComponent, title: 'Timeline page' },    
        {path: 'users/:id/posts', component: ProfileComponent, title: 'Profile page' },
        {path: 'details', component: PostDetailsComponent, title: 'Details page' }, 
        {path: 'users/settings', component: SettingsComponent, title: 'Settings page' },
        {path: 'posts/:id', component: PostDetailsComponent, title: 'Details page' },
    ]},
      {path:"",component:AuthLayoutComponent,children:[
        {path: 'login', component: LoginComponent, title: 'Login page',canActivate:[guestGuard] },
        {path: 'register', component: RegisterComponent, title: 'Register page',canActivate:[guestGuard] },
    ]},
    {path: '**', component:NotFoundComponent, title: 'Not Found' },
];
