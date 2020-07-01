import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { SocketioService } from '../services/socketio.service';
import {environment} from './../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  socket;
  messages;
  users = [];
  constructor(
  private route: ActivatedRoute,
  private messageService: MessageService,
  private router: Router,
  private socketService: SocketioService,
  private userService: UserService) {
    this.socket = socketService.getSocketConnection();
  }

  ngOnInit(): void {
    this.messageService.getMessages()
    .pipe(first())
    .subscribe(
        data => {
            this.messages = data.msgData;
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
    this.socket.on('MSG_RECV', (msg) => {
          console.log(msg, msg.user_id, localStorage.getItem('userId'),
          msg.user_id === parseInt(localStorage.getItem('userId')));
        if(msg.user_id === parseInt(localStorage.getItem('userId'))) {
          msg.date = moment().format('YYYY-MM-DD hh:mm:ss');
          this.messages.unshift(msg);
        }
    });
    this.userService.getUser(localStorage.getItem('userEmail'))
    .pipe(first())
    .subscribe(
        data => {
          const userInfo = data.result;
          this.socket.emit('USER_CONNECTED', userInfo);
          this.socket.on('CONNECTED_LIST', (users) => {
              this.users = users;
          });
        },
        error => {
            // this.alertService.error(error.error.message);
            // this.loading = false;
        }
      );
      this.socket.on('LOGOUT_DONE', (users) => {
        this.users = users;
      });
  }

}
