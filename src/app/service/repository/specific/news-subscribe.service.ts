import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppConstants} from '../../../app-constants';
import {AbstractNewsSubscribeService} from '../abstract/abstract-news-subscribe-service';

@Injectable()
export class NewsSubscribeService extends AbstractNewsSubscribeService {

  constructor(private http: Http) {
    super();
  }

  subscribeToNews(email: string): Observable<Response> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(AppConstants.EMAIL_SUBSCRIPTION_ENDPOINT, email, {headers:headers});
  }

}
