import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
 const _ToastrService=inject(ToastrService);

  return next(req).pipe(catchError((err)=>{

     if (isPlatformBrowser(platformId)) {
        _ToastrService.error(err.error?.message);
      }

     return throwError(()=>err);
  }))
};
