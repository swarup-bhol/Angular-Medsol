import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIsService } from 'src/app/Services/apis.service';
import { HeaderService } from 'src/app/Services/header.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  // Declared Variable
  gradeSelect: boolean;
  checkProf = true;
  professions:[];
  gradeList:[];
  specializations:[];
  subSpecList:[];
  infoForm: FormGroup;
  isSubmitted = false;
  email: string; 


  // Instantiating objects
  constructor(
    private fb: FormBuilder,
    private _apiService: APIsService,
    private _hs: HeaderService,
    private _ts: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  // Init Method to crearte form instances
  // Get the parameter value 
  ngOnInit() {
    this._hs.loader.next(true);
    this.email = this.route.snapshot.paramMap.get("username");
    this.gradeSelect = true;
    this._hs.header.next(false);

    // Form instances
    this.infoForm = this.fb.group({
      profession: ['', Validators.required],
      grade: ['', Validators.required],
      institute: ['', Validators.required],
      specialty: ['', Validators.required],
      subspecialties: ['', Validators.required],
    });
    this.getAllProfession();
    this.getAllSpecialization();    
  }


  // Getting All profession
  getAllProfession(){
    // url to get the all professions
    const profeUrl = "http://localhost:8080/api/medsol/profession/all";
    this._apiService.getRequest(profeUrl).subscribe(
      data=>{
        if(data.status == 200){
          this.professions = data.result;
          this._hs.loader.next(false);
        }else{
          this._hs.loader.next(false);
        }
      },
      error=>{
        this._ts.error("Some error occured");
        this._hs.loader.next(false);
        console.log(error);
      }
     
    );
  }
  //
  onProfSelect(id){
    if(id != '20' || id != '22' || id != '23'){
      this.gradeSelect= false;
      const url = "http://localhost:8080/api/medsol/profession/spec/"+id;
      this._apiService.getRequest(url).subscribe(
       data=>{
         if(data.status = 200) this.gradeList = data.result;
       }
      );
    }
    if(id == 21) this.checkProf=false;
    else this.checkProf=true;
    this._ts.success('Hello world!', 'Toastr fun!');
  }

  //Get all Specializations 
  getAllSpecialization(){
    const url = "http://localhost:8080/api/medsol/profession/spec/20";
    this._apiService.getRequest(url).subscribe(
      data=>{
        if(data.status = 200) this.specializations = data.result;
      }
     );
  }
  // Getting the subspecialization list
  onSpecSelected(id){
      const url = "http://localhost:8080/api/medsol/profession/subSpec/"+id;
      this._apiService.getRequest(url).subscribe(
       data=>{
         if(data.status = 200) this.subSpecList = data.result;
       }
      );
    }


    // Submitting the form
    onSubmit(){
     
      this.isSubmitted = true;
      if(!this.infoForm.valid) return;
      this._hs.loader.next(true);
      const infoUrl= "http://localhost:8080/api/medsol/profile/"+this.email;
      this._apiService.postRequest(infoUrl,this.infoForm.value).subscribe(
        success=>{
          if(success.status == 200){
            localStorage.setItem('token', success.result.token); this._hs.loader.next(false); this.router.navigate(['/feeds'])
          }else if(success.status == 409){this._ts.error("Profile Already exist for the user");this._hs.loader.next(false);}
        },
        error=>{
          this._hs.loader.next(false);
          this._ts.error("Some error Occred");
          console.log(error);
        }
      );
    }


    //return form controls
    get f() { return this.infoForm.controls; }
}
