import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { SocketioService } from '../services/socketio.service';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  loading = false;
  submitted = false;
  socket;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private alertService: AlertService,
    private socketService: SocketioService
  ) {
      this.socket = socketService.getSocketConnection();
    }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      post_title: ['', Validators.required],
      post_desc: ['', Validators.required],
      post_text: ['', Validators.required]
    });
  }

  get f() { return this.postForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.postForm.invalid) {
          return;
      }

      this.loading = true;
      this.postService.createPost(this.postForm.value)
      .pipe(first())
      .subscribe(
          data => {
              this.socket.emit('POST_SENT', this.postForm.value);
              this.router.navigate(['/']);
          },
          error => {
              this.alertService.error(error.error.message);
              this.loading = false;
          });

    }

}
