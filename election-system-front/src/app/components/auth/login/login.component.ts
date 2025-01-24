import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
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

  handleLoginError(error?: any) {
    if (error) {
      console.error(error);
    }

    // Si el login falla, se muestra un mensaje de error
    const errorLogin = sessionStorage.getItem("errorLogin");

    if (errorLogin === 'Incorrect email or password') {
      this.loginError = 'Nombre de usuario o contraseña incorrectos';
    } else{
      this.loginError = 'Error desconocido. ¡Comuniquese con soporte!';
    }
  }
}
