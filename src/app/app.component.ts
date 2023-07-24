import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public spinnerService: SpinnerService,
    public messageService: MessageService,
    private userService: UserService
  ){
    this.userService.setUserInStart();
  }
}
