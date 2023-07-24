import { Component, Input } from "@angular/core";
import { TodoItem, TodoService } from './../../../../services/todo.service';
import { MessageService } from './../../../../services/message.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  constructor(
    private todoService: TodoService,
    private message: MessageService,
    private spinner: SpinnerService
  ){}

  @Input() item!: TodoItem;
  @Input() index!: number;

  toggleComplete() {
    // this.item.completed = !this.item.completed;
    const editedItem: any = {};
    this.spinner.showLoading();
    editedItem.user = this.item.user;
    editedItem.completed = !this.item.completed;
    editedItem.title = this.item.title;
    this.todoService.editData(editedItem, this.item.id).subscribe({
      next: res => {
        this.spinner.hideLoading();
        this.item.completed = !this.item.completed;
      },
      error: err => {
        // this.message.showMessage(err.message);
        this.spinner.hideLoading();
      },
      complete: () => {
        this.spinner.hideLoading();
      }
    }) 
  }
}