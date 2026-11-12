import { AuthService } from './../../core/services/auth/auth-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
 private readonly _AuthService= inject(AuthService);
 private readonly _Router= inject(Router);
step:number=1;
verifyEmail: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email])
})

verifyCode: FormGroup = new FormGroup({
  resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
})

resetPassword: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
})

verifyEmailSubmit():void{

 let emailvalue=this.verifyEmail.get("email")?.value;
    this.resetPassword.get("email")?.patchValue(emailvalue);
 this._AuthService.setEmailverify(this.verifyEmail.value).subscribe({
  next:(value)=> {
    if(value.statusMsg=="success"){
      this.step=2;
    }
  },
  error:(err)=> {
    console.log(err);
  },
 })
}
verifyCodeSubmit():void{

 this._AuthService.setCodeverify(this.verifyCode.value).subscribe({
  next:(value)=> {
    console.log(value);
    if(value.status=="Success"){
      this.step=3;
    }

  },
  error:(err)=> {
    console.log(err);
  },
 })

}
verifyRestPasswordSubmit():void{

 this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
  next:(value)=> {
    console.log(value);
    localStorage.setItem("userToken",value.token);

    this._AuthService.saveUserData();
    this._Router.navigate(["/home"]);
  },
  error:(err)=> {
    console.log(err);
  },
 })
}
}
