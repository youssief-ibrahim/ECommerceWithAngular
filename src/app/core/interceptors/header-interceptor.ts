import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) =>
{

  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {

    const token = localStorage.getItem('userToken');

    if (token) {
      if (req.url.includes('cart') || req.url.includes('wishlist') ||req.url.includes('orders')) 
          {
          req = req.clone({
          setHeaders: { token: token }
        });
      }
    }
  }

  return next(req);
};
