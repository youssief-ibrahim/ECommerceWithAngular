import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './nav-auth.html',
  styleUrl: './nav-auth.scss',
})
export class NavAuth {}
