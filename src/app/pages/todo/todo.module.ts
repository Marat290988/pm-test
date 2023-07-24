import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.compoennt';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header.component';

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent
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
