import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public isShow = false;
  public message = '';
  public showMessage(message: string) {
    setTimeout(() => {
      this.hideMessage();
    }, 5000);
    this.message = message;
    this.isShow = true;
  }
  public hideMessage() {
    this.message = '';
    this.isShow = false;
  }
}
