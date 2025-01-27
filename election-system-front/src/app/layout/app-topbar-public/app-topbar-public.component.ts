import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-app-topbar-public',
  imports: [
    Menubar,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './app-topbar-public.component.html',
  styleUrl: './app-topbar-public.component.scss'
})
export class AppTopbarPublicComponent {

  constructor(private router: Router){}

  login(){
    this.router.navigate(['/auth/login']);
  }
}
