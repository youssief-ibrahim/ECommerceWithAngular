import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { PlatformService } from '../services/platformservice/platform-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) =>
{
   const _PlatformService = inject(PlatformService);

  if (_PlatformService.isBrowser()) {

    const token = localStorage.getItem('userToken');

    if (token &&(
        req.url.includes('cart') ||
        req.url.includes('wishlist') ||
        req.url.includes('orders')
      )) {
      req = req.clone({
        setHeaders: { token: token }
      });
    }
  }

  return next(req);
};
