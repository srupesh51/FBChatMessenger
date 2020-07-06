import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from './../../environments/environment';
import { SocketioService } from './socketio.service';
const BACKEND_API_URL = environment.apiURL + '/users';
@Injectable()
export class AuthenticationService {
    socket;
    constructor(private http: HttpClient,
    private socketService: SocketioService) {
      this.socket = socketService.getSocketConnection();
    }

    login(email: string, password: string) {
        return this.http.post<any>(BACKEND_API_URL +'/login', { email: email, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.data.token);
                    localStorage.setItem('userId', user.data.user_id);
                    localStorage.setItem('userEmail', user.data.email);
                }

                return user;
            }));
    }

    logout() {
        this.socket.emit('LOGOUT', parseInt(localStorage.getItem('userId')));
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
    }
}
