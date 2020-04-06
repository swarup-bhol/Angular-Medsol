import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material';
import { APIsService } from 'src/app/Services/apis.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  userId = localStorage.getItem('id');
  imageURL: string;
  uploadPost: FormGroup;
  fileData: File;
  isSubmitted = false;
  constructor(
    private _fb: FormBuilder,
    private _dialogRef : MatDialogRef<PostsComponent>,
    private _as: APIsService,
    private _ts: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.uploadPost = this._fb.group({
      content: ['',[Validators.required]]
    })
  }

  onFileChanged(event) {
    const reader = new FileReader();
    this.fileData = <File>event.target.files[0];
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }

  }
  submit(){
    const url="http://localhost:8080/api/medsol/posts/"+this.userId;
    this.isSubmitted = true;
    if(this.uploadPost.invalid) return;
    const formData = new FormData();
    if(this.fileData != undefined){
      formData.append('file', this.fileData);
    }
    formData.append('content', this.uploadPost.value.content);
    this._as.postRequest(url,formData).subscribe(
      data=>{
        if(data.status == 200){
          this._ts.success("Post Uploaded Successfully")
        }
        this._dialogRef.close();
      },
      error=>{
        if(error.status == 401){
          localStorage.removeItem('token');
          this._router.navigate(['/login']);
          this._ts.error('Token expire Please login to proceed')
        }else{
          this._ts.error("Internal Server Error")
        }
        this._dialogRef.close();
      }
    );
    
  }
  deleteImage(){
    this.fileData = null;
    this.imageURL ='';
  }
  closeDialog(){
    this._dialogRef.close();
  }
  get f() { return this.uploadPost.controls; }
}
