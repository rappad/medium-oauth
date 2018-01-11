import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  user_profile: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  requestAccessToken(code) {
    return this.http.get(environment.API_BASE_URL + '/getAccessToken?code=' + code).map((res) => {
      localStorage.setItem('accessToken', JSON.stringify(res));
      console.log('accessToken ', localStorage.getItem('accessToken'));
      return res;
    });
  }

  getUserProfile(accessToken) {
    return this.http.get(environment.API_BASE_URL + '/getUserDetail',
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + accessToken.access_token)
      }).map((res) => {
        localStorage.setItem('userProfile', JSON.stringify(res));
        console.log('userProfile ', localStorage.getItem('userProfile'));
        return res;
      });
  }

  logout() {
    // Clearing localStorage

    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('publicationsList');
  }
}
