import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
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
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  sendMessage() {
    this.router.navigate(['/sender']);
  }
  createPost() {
    this.router.navigate(['/create-post']);
  }
}
