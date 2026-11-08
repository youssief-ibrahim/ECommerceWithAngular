import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth//auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink,NgClass],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private readonly _AuthService=inject(AuthService);
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _Router =inject(Router);
  
  msMessage:string="";
  msSusses:boolean=false;
  isloading:boolean=false;
  showPassword: boolean = false;
  showRePassword: boolean = false;
  registerForm:FormGroup= this._FormBuilder.group({
    name:[null,
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]
    ],
    email:[null,[
    Validators.required,
    Validators.email
    ]],
    password:[null,[
     Validators.required,
     Validators.pattern(/^\w{6,}$/)
    ]],
    rePassword:[null,[
      Validators.required
    ]],
    phone:[null,[
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ]]
  },{validators:this.confirmPassword});

  // registerForm:FormGroup=new FormGroup({
  //   name: new FormControl(null,[
  //     Validators.required,
  //     Validators.minLength(3)
  //     ,Validators.maxLength(20)
  //   ]),
  //   email:new FormControl(null,[
  //   Validators.required,
  //   Validators.email
  // ]),
  //   password: new FormControl(null,[
  //     Validators.required,
  //    Validators.pattern(/^\w{6,}$/)
  //   ]),
  //   rePassword: new FormControl(null,[
  //     Validators.required
  //   ]),
  //   phone: new FormControl(null,[
  //     Validators.required,
  //     Validators.pattern(/^01[0125][0-9]{8}$/)
  //   ])
  // },this.confirmPassword);

  submitForm(): void {
  if (this.registerForm.valid) {

    this.isloading=true;
    this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
      next: (res) => {
        if(res.message=='success')
        {
          this.msSusses=true;
          setTimeout(() => {
            this._Router.navigate(['/login'])
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
    // this.registerForm.setErrors({mismatch: true});
    this.registerForm.markAllAsTouched()
  }
}

  confirmPassword(g: AbstractControl) {
  if (g.get('password')?.value === g.get('rePassword')?.value) {
    return null;
  }
  else {
    return { mismatch: true };
  }
}
}
