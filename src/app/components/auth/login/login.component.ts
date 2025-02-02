import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { Message, MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageSeverity } from '../../../enums/message.enum';
import { LoginError,  LoginMessageDetail} from '../../../enums/login.enum';
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

  loginForm!: FormGroup;
  msgs: ToastMessageOptions[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
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

      if (response)
        this.router.navigate(['/admin/candidates'], { relativeTo: this.activatedRoute });
      else
        this.handleLoginError();

    } catch (error) {
      this.handleLoginError(error);
    }
  }

  handleLoginError(response?: any) {
    const errorLogin = response.error.error;

    if (errorLogin === LoginError.INCORRECT_CREDENTIALS)
      this.showMessage(MessageSeverity.ERROR, LoginMessageDetail.FORM_INCOMPLETE);
    else
      this.showMessage(MessageSeverity.ERROR, LoginMessageDetail.UNKNOWN_ERROR);
  }

  private showMessage(severity: MessageSeverity, detail: LoginMessageDetail, life: number = 4000) {
    this.messageService.add({ severity, summary: '', detail, life });
  }
}
