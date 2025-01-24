import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../api/apiResponse';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-change-password',
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToastModule
  ],
  providers: [
    MessageService,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  onChangePassword() {

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Por favor, ingrese todas las contraseñas.' });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Las contraseñas no coinciden' });
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: (response: ApiResponse<{ message: string }>) => {
        if (response.status === 'success') {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Contraseña actualizada exitosamente' });
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        }
      },
      error: (response: any) => {
          let error = response.error.error;
          if (error === 'New password cannot be the same as the current password') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La nueva contraseña no puede ser la misma que la contraseña actual' });
          } else if (error === 'The current password is incorrect') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La contraseña actual es incorrecta' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error inesperado' });
          }
      },
      complete: () => {

      }

    });
  }
}
