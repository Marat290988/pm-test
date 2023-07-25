import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TodoItem, TodoService } from './../../../../services/todo.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { faPenToSquare, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { take } from "rxjs";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  constructor(
    private todoService: TodoService,
    private spinner: SpinnerService
  ){}

  @Input() item!: TodoItem;
  @Input() index!: number;
  @Output() updateList = new EventEmitter();
  title = '';
  iconPen = faPenToSquare;
  iconCheck = faCircleCheck;
  iconTrash = faTrashCan;
  mode: 'edit' | 'apply' = 'edit';
  isSure = false;

  ngOnInit() {
    this.title = this.item.title;
  }

  toggleComplete() {
    const editedItem: any = {};
    this.spinner.showLoading();
    editedItem.user = this.item.user;
    editedItem.completed = !this.item.completed;
    editedItem.title = this.item.title;
    this.todoService.editData(editedItem, this.item.id).pipe(take(1)).subscribe({
      next: res => {
        this.spinner.hideLoading();
        this.item.completed = !this.item.completed;
      },
      error: err => {
        this.spinner.hideLoading();
      },
      complete: () => {
        this.spinner.hideLoading();
      }
    })
  }

  editTodo() {
    this.mode = 'apply';
  }

  applyTodo() {
    this.title = this.title.trim();
    if (this.title === '') {
      return;
    }
    const editedItem: any = {};
    this.spinner.showLoading();
    editedItem.user = this.item.user;
    editedItem.completed = this.item.completed;
    editedItem.title = this.title;
    this.item.title = this.title;
    this.todoService.editData(editedItem, this.item.id).pipe(take(1)).subscribe({
      next: res => {
        this.mode = 'edit';
        this.spinner.hideLoading();
        this.item.completed = !this.item.completed;
      },
      error: err => {
        this.spinner.hideLoading();
      },
      complete: () => {
        this.spinner.hideLoading();
      }
    })
  }

  onClickRemove() {
    this.isSure = true;
  }

  no() {
    this.isSure = false;
  }

  yes() {
    this.isSure = false;
    this.spinner.showLoading();
    this.todoService.removeData(this.item.id).pipe(take(1)).subscribe({
      next: res => {
        this.spinner.hideLoading();
        this.updateList.emit();
      },
      error: err => {
        this.spinner.hideLoading();
      },
      complete: () => {
        this.spinner.hideLoading();
      }
    })
  }
}
