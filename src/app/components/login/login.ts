import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth//auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  
  private readonly _AuthService=inject(AuthService);
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _Router =inject(Router);
  loginSubscribe!:Subscription
  msMessage:string="";
  msSusses:boolean=false;
  isloading:boolean=false;
  showPassword: boolean = false;
  
  loginform:FormGroup= this._FormBuilder.group({
   
    email:[null,[
    Validators.required,
    Validators.email
    ]],
    password:[null,[
     Validators.required,
    ]],
  });

  submitForm(): void {
  if (this.loginform.valid) {

    this.isloading=true;
    this.loginSubscribe=this._AuthService.setloginform(this.loginform.value).subscribe({
      next: (res) => {
        if(res.message=='success')
        {
          this.msSusses=true;
          setTimeout(() => {
            localStorage.setItem("userToken",res.token);
            this._AuthService.saveUserData();
            console.log(this._AuthService.userData);
            this._Router.navigate(['/home']);
          }, 1500);
        }
        this.isloading=false;
      },
      error: (err:HttpErrorResponse) => {
        this.msMessage=err.error.message;
        this.isloading=false;
      }
    });
  }
  else{
    this.loginform.markAllAsTouched()
  }
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.loginSubscribe?.unsubscribe();
}


}
