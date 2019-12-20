import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

     baseUrl = 'http://amin601-001-site1.gtempurl.com/api/auth/';
     jwtHelper = new JwtHelperService();
     decodeToken: any;

constructor(private http: HttpClient) { }

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model)
            .pipe(map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem('token', user.token);
                    this.decodeToken = this.jwtHelper.decodeToken(user.token);
                    console.log(this.decodeToken);
                }
            }));
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }


}
