import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public isShow = false;
  public message = '';
  public showMessage(message: string) {
    this.message = message;
    this.isShow = true;
  }
  public hideMessage() {
    this.message = '';
    this.isShow = false;
  }
}
