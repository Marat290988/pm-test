import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.compoennt';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoComponent
      }
    ])
  ]
})
export class TodoModule {

}
