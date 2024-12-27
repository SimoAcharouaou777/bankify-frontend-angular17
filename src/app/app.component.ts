import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {}
