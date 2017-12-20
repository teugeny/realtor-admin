import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

interface LoginResponse {
    token: string
}

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('ajax-access-token');
    }

    /**
     * Базовая авторизация
     * @param {string} username
     * @param {string} password
     * @returns {Observable<boolean>}
     */
    login(username: string, password: string): Observable<boolean> {
        return this.http.post<LoginResponse>('http://localhost:3000/login',{username:username, password: password})
            .map(response => {
                if (response.token) {
                    localStorage.setItem('ajax-access-token', response.token);
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout():void {
        localStorage.removeItem('ajax-access-token');
    }
}