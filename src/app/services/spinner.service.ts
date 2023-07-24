import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isLoading = false;
  public showLoading() {
    this.isLoading = true;
  }
  public hideLoading() {
    this.isLoading = false;
  }
}
