import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authGuard } from './../../../utils/auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { AddNewItemComponent } from './components/add-new-item/add-new-item.component';

@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    TodoItemComponent,
    AddNewItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoComponent,
        canActivate: [authGuard]
      }
    ]),
    FontAwesomeModule,
    FormsModule
  ]

})
export class TodoModule {

}
