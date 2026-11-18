import { TranslateService } from '@ngx-translate/core';
import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { PlatformService } from '../platformservice/platform-service';
@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  private readonly _TranslateService=inject(TranslateService);
  private readonly _PlatformService=inject(PlatformService);
  private readonly _Renderer2=inject(RendererFactory2).createRenderer(null,null);
  constructor() {
    if(this._PlatformService.isBrowser())
    {
    let savedLang = localStorage.getItem('lang');
    if (savedLang !== 'ar' && savedLang !== 'en') {
       savedLang = 'en';
    }
    this._TranslateService.use(savedLang!);
    this.changeDirection();
    }
  }

  changeDirection(): void {
  let savedLang = localStorage.getItem('lang');
  if (savedLang === "en") {
    // dir ltr
    this._Renderer2.setAttribute(document.documentElement,"dir","ltr");
    this._Renderer2.setAttribute(document.documentElement,"lang","en");
    // document.documentElement.dir = 'ltr';
  } else if (savedLang === "ar") {
    // dir rtl
    this._Renderer2.setAttribute(document.documentElement,"dir","rtl");
    this._Renderer2.setAttribute(document.documentElement,"lang","ar");
    // document.documentElement.dir = 'rtl';
  }
}
changeLang(lang: string): void {
  if(this._PlatformService.isBrowser())
  {
   localStorage.setItem('lang', lang); // Save Lang Inside Local (en, ar);
   this._TranslateService.use(lang);   // Use Lang Words
   this.changeDirection();
  }
}
}
