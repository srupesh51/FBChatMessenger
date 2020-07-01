import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketioService } from './../../services/socketio.service';
import { AuthenticationService } from './../../services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  socket;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private socketService: SocketioService) {
      this.socket = socketService.getSocketConnection();
  }

  ngOnInit(): void {
  }
  canAccess() {
    if(localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
  logout() {
    this.socket.emit('LOGOUT', parseInt(localStorage.getItem('userId')));
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  sendMessage() {
    this.router.navigate(['/sender']);
  }
}
