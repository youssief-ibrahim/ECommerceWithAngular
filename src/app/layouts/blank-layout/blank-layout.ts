import { Component } from '@angular/core';
import { NavBlank } from '../../components/nav-blank/nav-blank';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  imports: [NavBlank, Footer, RouterOutlet],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss',
})
export class BlankLayout {}
