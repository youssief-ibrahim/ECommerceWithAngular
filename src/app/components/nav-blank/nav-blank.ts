import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth//auth-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/transelat/mytranslate-service';


@Component({
  selector: 'app-nav-blank',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './nav-blank.html',
  styleUrl: './nav-blank.scss',
})
export class NavBlank {

  readonly _AuthService=inject(AuthService);
 private readonly _MytranslateService=inject(MytranslateService);
  readonly _TranslateService=inject(TranslateService);

  change(lang:string):void{
    this._MytranslateService.changeLang(lang);
  }
}
