import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/todo/todo.module')
      .then(module => module.TodoModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(module => module.AuthModule)
  },
  { path: '**', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
