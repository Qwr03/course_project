import { Component, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../environments/environment.prod';

@Component({
  selector: 'cp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public prediction: string = '';
  public review: string = '';
  public tipsText = ['So, all you need to do now is to put a review into the box...', 'Wait a liitle bit while we perfom some magic...', 'Tada-da-da-m, the usefulness of ur comment is ', 'Something is wrong, something is really wrong, BAD, CATASTROPHIC, to be precise...']
  public tipIndex = 0;
  public isLoading: boolean = false;
  public freezeStatus = new EventEmitter<boolean>(false);

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  public doSomeMagic() {
    if (this.prediction && this.tipIndex === 2) {
      this.next();
      return;
    }
    if (this.review) {
      this.freezeStatus.emit(true);
      this.isLoading = true;
      this.tipIndex = 1;

      this.getData().subscribe(
        (response) => {
          if (response) this.prediction = response[0]
          this.freezeStatus.emit(false);
          this.isLoading = false;
          this.tipIndex = 2;
        },
        (error) => {
          this.tipIndex = 3;
          console.error(error);
          this.freezeStatus.emit(false);
          this.isLoading = false;
        }
      );
    } else {
      if (!this.isLoading) {
        window.alert('Hey, Cowboy, write a review first');
      } else {
        window.alert('Hold your horses, Cowboy');
      }
    }
  }

  public next() {
    this.tipIndex = 0;
    this.prediction = '';
    this.review = '';
  }

  getData(): Observable<any> {
    const api = apiUrl;
    return this.http.post<ApiBody>(api + 'estimate', { review: this.review });
  }

}

interface ApiBody {
  review: string;
}