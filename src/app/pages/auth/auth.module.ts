import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.compoennt';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ])
  ]
})
export class AuthModule {

}
