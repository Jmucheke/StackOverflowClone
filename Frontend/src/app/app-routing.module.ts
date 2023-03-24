import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './questions/edit-question/home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { AuthGuard } from './shared/services/guards/guard.service';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./questions/edit-question/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path:'login',
    loadComponent:()=>
      import('./auth/login/login.component').then((c) =>c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path:'questions',
    loadComponent:()=>
      import('./questions/questions.component').then((c) => c.QuestionsComponent), children: [
        {
          path:'',
          loadComponent:()=>
            import('./questions/display-questions/display-questions.component').then((c)=>c.DisplayQuestionsComponent),
          canActivate: [AuthGuard]
        },
        {
          path: 'one-question/:id',
          loadComponent: () =>
            import('./questions/one-question/one-question.component').then((c) => c.OneQuestionComponent),
          canActivate: [AuthGuard]
        },
      { 
        path: 'edit-question',
        loadComponent: () =>
          import('./questions/edit-question/edit-question.component').then((c) => c.EditQuestionComponent),
          canActivate: [AuthGuard]
      },
      {
        path: 'ask-question',
        loadComponent: () =>
          import('./questions/ask-question/ask-question.component').then((c) => c.AskQuestionComponent),
        canActivate: [AuthGuard]
      }

      ]
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then((c) => c.UserProfileComponent), children:[
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./user-profile/edit-profile/edit-profile.component').then((c) => c.EditProfileComponent),
          canActivate: [AuthGuard]
      },
      {
        path: '',
        loadComponent: () =>
          import('./user-profile/summary-profile/summary-profile.component').then((c) => c.SummaryProfileComponent),
          canActivate: [AuthGuard]
      }
      ]
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((c) => c.AdminComponent), children: [
        {
          path: '',
          loadComponent: () =>
            import('./admin/users/users.component').then((c) => c.UsersComponent),
          canActivate: [AuthGuard]
        }
      ]
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
