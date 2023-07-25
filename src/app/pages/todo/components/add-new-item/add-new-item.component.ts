import { Component, EventEmitter, Output } from "@angular/core";
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { take } from "rxjs";
import { SpinnerService } from "src/app/services/spinner.service";
import { TodoService } from "src/app/services/todo.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent {

  constructor(
    private userService: UserService,
    private spinner: SpinnerService,
    private todoService: TodoService
  ) {}

  title = '';
  isSure = false;
  iconPlus = faSquarePlus;
  notTouch = true;
  @Output() updateList = new EventEmitter();

  no() {
    this.isSure = false;
  }

  yes() {
    this.spinner.showLoading();
    this.isSure = false;
    const editedItem: any = {};
    editedItem.user = this.userService.user?.user_id;
    editedItem.completed = false;
    editedItem.title = this.title;
    this.title = '';
    this.notTouch = true;
    this.todoService.addNewData(editedItem).pipe(take(1)).subscribe({
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

  touch() {
    this.notTouch = false;
  }

  startAdd() {
    this.title = this.title.trim();
    if (this.title === '') {
      return;
    }
    this.isSure = true;
  }
}
