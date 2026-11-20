import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth//auth-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/transelat/mytranslate-service';
import { CartService } from '../../core/services/cart/cart-service';
import { PlatformService } from '../../core/services/platformservice/platform-service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, NgClass],
  templateUrl: './nav-blank.html',
  styleUrl: './nav-blank.scss',
})
export class NavBlank implements OnInit {

  readonly _AuthService=inject(AuthService);
 private readonly _MytranslateService=inject(MytranslateService);
 private readonly _PlatformService = inject(PlatformService);
  readonly _TranslateService=inject(TranslateService);
  readonly _CartService=inject(CartService);

  navcartCounter:Signal<number>=computed(()=>this._CartService.cartNumber());
  ngOnInit(): void {
  if (this._PlatformService.isBrowser()) {
    if (localStorage.getItem('userToken')) {
      this._CartService.getProductOfCartt().subscribe({
        next: (res) => {
          this._CartService.cartNumber.set(res.numOfCartItems);
        }
      });
    }
    // this._CartService.cartNumber.subscribe({
    //   next: (data) => {
    //     this.cartCounter = data!;
    //   }
    // });
  }
}

  change(lang:string):void{
    this._MytranslateService.changeLang(lang);
  }
}
