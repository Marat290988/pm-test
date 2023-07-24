import { Component } from "@angular/core";
import { TodoService } from '../../services/todo.service';
import { MessageService } from './../../services/message.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TodoItem } from './../../services/todo.service';
import { take } from "rxjs";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private spinner: SpinnerService
  ){}

  todoList: TodoItem[] = [];

  ngOnInit() {
    this.todoService.getAll().pipe(take(1)).subscribe({
      next: res => {
        this.todoList = res;
      },
      error: err => {
        this.messageService.showMessage(err.message);
      }
    })
  }
}
