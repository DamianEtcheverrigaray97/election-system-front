import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MessageModule,
    MessagesModule
  ],
  providers: [MessageService],
})
export class LoginComponent {
  loginForm: FormGroup;
  msgs: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    try {
      const response = await this.authService.loginUser(username, password).toPromise();

      if (response) {
        this.router.navigate(['/admin/candidates'], { relativeTo: this.activatedRoute });
      } else {
        this.handleLoginError();
      }

    } catch (error) {
      this.handleLoginError(error);
    }
  }

  handleLoginError(response?: any) {
    const errorLogin = response.error.error;

    if (errorLogin === 'Incorrect email or password') {
      this.messageService.add({
        severity: 'error',
        summary: '',
        detail: 'El correo electrónico o la contraseña son incorrectos.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: '',
        detail: 'Ha ocurrido un error inesperado. Comunícate con soporte para más información.',
      });
    }
    

  }
}
