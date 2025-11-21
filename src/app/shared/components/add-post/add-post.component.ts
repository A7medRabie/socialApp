import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
 import { PostsService } from '../../../core/services/posts.service';
import { ToastService } from '../../../../../projects/shared-utils/src/public-api';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  content:FormControl=new FormControl(null,[Validators.required]);
  saveFile:File[] = [];
  previewUrls: string[] = []
  maxSize: number = 200 * 1024 ;// 200 KB

  private _toastr=inject(ToastService)
  private _postsService=inject(PostsService);

ngOnInit() {
  initFlowbite();
  }

selectImage(e:Event){
     
      this.saveFile = [];
      this.previewUrls = [];
      const target = e.target as HTMLInputElement;
 
      if (target.files && target.files.length > 0) {
         for (let file of Array.from(target.files)) {
            if (file.size > this.maxSize) {
                this._toastr.error(`File ${file.name} exceeds the maximum size of 200 KB.`);
             }else {
              this.saveFile.push(file);

            const reader = new FileReader();

            reader.onload = (e: Event) => {
            
              const fileReaderTarget = e.target as FileReader;
               this.previewUrls.push(fileReaderTarget.result as string);

             }
             reader.onerror = () => {
                 this._toastr.error(`Error reading file: ${file.name}`);
              };  
             
             reader.readAsDataURL(file);

           }
    
      }
  
  }
 }

  

  submitForm(e: Event){
    e.preventDefault();
    if (this.content.valid && this.saveFile.length > 0) {
     const formData = new FormData();
      formData.append('body', this.content.value);
      for (let i = 0; i < this.saveFile.length; i++) {
        formData.append('image', this.saveFile[i]);
      }

      this._postsService.createPost(formData).subscribe({
        next: (response) => {
          this._toastr.success(response.message);
          this.content.reset();
            
        },
        error: (error) => {
           
           this._toastr.error(error.error.error);
        }
      });
    }
 
  }
   
}


 
