import { MessageService } from './../../services/message.service';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SpinnerService } from "src/app/services/spinner.service";
import { User, UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private titleService: Title,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ){
    this.titleService.setTitle('Auth Page');
  }

  ngOnInit() {
    if (this.userService.user) {
      this.router.navigate(['/']);
    }
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.spinnerService.showLoading();
    try {
      this.userService.login(this.formGroup.value).pipe(take(1)).subscribe({
        next: (res) => {
          const user: User = res.body as User;
          this.userService.setUser(user);
          if (user.token) {
            this.router.navigate(['/']);
          }
        },
        error: err => {
          // this.messageService.showMessage(err.message);
          setTimeout(() => {
            this.messageService.hideMessage();
          }, 5000);
          this.spinnerService.hideLoading();
        },
        complete: () => {
          this.spinnerService.hideLoading();
        }
      })
    } catch(e) {}

  }
}
