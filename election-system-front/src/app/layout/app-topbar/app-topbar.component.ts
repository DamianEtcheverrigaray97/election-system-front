import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple, RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-app-topbar',
  imports: [
    Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, RouterLink, ButtonModule, RippleModule
  ],
  standalone: true,
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss'
})
export class AppTopbarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router){ }

  ngOnInit() {
    this.items = [
      {
        label: 'Candidatos más votados',
        icon: 'pi pi-users', 
        routerLink: ['candidates']
      },
      {
        label: 'Lista de votos',
        icon: 'pi pi-list', 
        routerLink: ['votes']
      },
      {
        label: 'Agregar nuevo votante',
        icon: 'pi pi-user-plus', 
        routerLink: ['add-voter']
      },
      {
        label: 'Modificar contraseña administrador',
        icon: 'pi pi-key', 
        routerLink: ['change-password']
      }
  ];
  }

  logout() {
    sessionStorage.clear(); 
    this.router.navigate(['auth/login']); 
  }
}
