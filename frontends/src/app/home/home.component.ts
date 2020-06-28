import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import {environment} from './../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  socket;
  messages;
  constructor(
  private route: ActivatedRoute,
  private messageService: MessageService,
  private router: Router) {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  ngOnInit(): void {
    this.messageService.getMessages()
    .pipe(first())
    .subscribe(
        data => {
            this.messages = data.msgData;
            console.log(this.messages);
            if(this.messages !== undefined && this.messages.length > 0) {
              this.messages.forEach(element => {
                element.date = moment(element.date).format('YYYY-MM-DD hh:mm:ss');
              });
            }
        },
        error => {
            // this.alertService.error(error.error.message);
            // this.loading = false;
        });
        console.log(this.messages);
    this.socket.on('MSG_RECV', (msg) => {

            console.log(msg, msg.user_id, localStorage.getItem('userId'),
          msg.user_id === parseInt(localStorage.getItem('userId')));
        if(msg.user_id === parseInt(localStorage.getItem('userId'))) {
          msg.date = moment().format('YYYY-MM-DD hh:mm:ss');
          this.messages.unshift(msg);
        }
    });
  }

}
