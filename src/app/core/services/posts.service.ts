import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {  AllPostsResponse, CreatePostResponse, Post } from '../interfaces/posts.Interface';
import { Observable } from 'rxjs';
import { PostDetailsResponse } from '../interfaces/postdetails.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _http=inject(HttpClient);
  constructor() { }
  createPost(formData:FormData):Observable<CreatePostResponse>{
    return this._http.post<CreatePostResponse>(`${environment.baseUrl}/posts`,formData);
  }

  getAllPosts(): Observable<AllPostsResponse> {
    return this._http.get<AllPostsResponse>(`${environment.baseUrl}/posts`);
  }
  getUserPosts(userId:string): Observable<AllPostsResponse> {
    return this._http.get<AllPostsResponse>(`${environment.baseUrl}/users/${userId}/posts`);
  }
  getSinglePost(postId:string): Observable<PostDetailsResponse> {
    return this._http.get<PostDetailsResponse>(`${environment.baseUrl}/posts/${postId}`);
  }
  updatePost(postId:string,formData:FormData): Observable<CreatePostResponse> {
    return this._http.put<CreatePostResponse>(`${environment.baseUrl}/posts/${postId}`,formData);
  }
  deletePost(postId:string): Observable<{message:string}> {
    return this._http.delete<{message:string}>(`${environment.baseUrl}/posts/${postId}`);
  }
}
