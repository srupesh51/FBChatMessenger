import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../models/User';
import {environment} from './../../environments/environment';
const BACKEND_API_URL = environment.apiURL + '/users';
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    login(user: User) {
        return this.http.post(BACKEND_API_URL + '/login', user);
    }

    getUser(email: string) {
        return this.http.get<any>(BACKEND_API_URL + '/' + email);
    }

    register(user: User) {
        return this.http.post(BACKEND_API_URL + '/signup', user);
    }
}
