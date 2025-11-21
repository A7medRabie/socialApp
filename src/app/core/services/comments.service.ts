import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentBody, CommentsResponse } from '../interfaces/comments.Interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

   private readonly _http=inject(HttpClient);
   
   createComment(data:CommentBody):Observable<CommentsResponse>{

    return this._http.post<CommentsResponse>(`${environment.baseUrl}/comments`,data)
   }

   getPostComments(postId:string):Observable<CommentsResponse>{
    return this._http.get<CommentsResponse>(`${environment.baseUrl}/posts/${postId}/comments`)
   }
   updateComment(commentId:string,data:CommentBody):Observable<CommentsResponse>{

    return this._http.put<CommentsResponse>(`${environment.baseUrl}/comments/${commentId}`,data)
   }
   deleteComment(commentId:string):Observable<{message:string}>{
    return this._http.delete<{message:string}>(`${environment.baseUrl}/comments/${commentId}`)
   }
}
