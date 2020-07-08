import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './../models/Post';
import {environment} from './../../environments/environment';
const BACKEND_API_URL = environment.apiURL + '/posts';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
      return this.http.post(BACKEND_API_URL + '/create', post);
  }

  getPosts() {
      return this.http.get<any>(BACKEND_API_URL + '/');
  }
}
