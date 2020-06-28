import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Message } from './../models/Message';
import {environment} from './../../environments/environment';
const BACKEND_API_URL = environment.apiURL + '/messages';
@Injectable()
export class MessageService {
    constructor(private http: HttpClient) { }

    sendMessage(userId: Number, messageText: string) {
        return this.http.post(BACKEND_API_URL + '/create',
        {user_id: userId, message_text: messageText});
    }

    getMessages() {
        return this.http.post<any>(BACKEND_API_URL + '/', {user_id: localStorage.getItem('userId')});
    }
}
