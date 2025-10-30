import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {  CreatePostResponse } from '../interfaces/posts.Interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _http=inject(HttpClient);
  constructor() { }
  createPost(formData:FormData):Observable<CreatePostResponse>{
    return this._http.post<CreatePostResponse>(`${environment.baseUrl}posts`,formData);
  }
}
