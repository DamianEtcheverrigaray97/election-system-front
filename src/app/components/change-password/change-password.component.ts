import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../api/apiResponse';
import { MessageSeverity } from '../../enums/message.enum';
import { ChangePasswordError, ChangePasswordMessage, ChangePasswordMessageSummary,} from '../../enums/changePassword.enum';
@Component({
  selector: 'app-change-password',
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  passwordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onChangePassword() {
    if (this.passwordForm.invalid) {
      this.showMessage(MessageSeverity.WARN, ChangePasswordMessageSummary.ERROR, ChangePasswordMessage.FORM_INCOMPLETE);
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.showMessage(MessageSeverity.WARN, ChangePasswordMessageSummary.ERROR, ChangePasswordMessage.PASSWORD_MISMATCH);
      return;
    }

    this.authService.changePassword(currentPassword, newPassword).subscribe({
      next: (response: ApiResponse<{ message: string }>) => {
        if (response.status === 'success') {
          this.showMessage(MessageSeverity.SUCCESS, ChangePasswordMessageSummary.SUCCESS, ChangePasswordMessage.PASSWORD_SUCCESS);
          this.passwordForm.reset();
        }
      },
      error: (response: any) => {
        let error = response.error.error;

        switch (error) {
          case ChangePasswordError.NEW_PASSWORD_SAME_AS_CURRENT:
            this.showMessage(MessageSeverity.ERROR, ChangePasswordMessageSummary.ERROR, ChangePasswordError.NEW_PASSWORD_SAME_AS_CURRENT);
            break;
          case ChangePasswordError.INCORRECT_CURRENT_PASSWORD:
            this.showMessage(MessageSeverity.ERROR, ChangePasswordMessageSummary.ERROR, ChangePasswordMessage.INCORRECT_CURRENT_PASSWORD);
            break;
          default:
            this.showMessage(MessageSeverity.ERROR, ChangePasswordMessageSummary.ERROR, ChangePasswordError.UNKNOWN_ERROR);
            break;
        }
      }
    });
  }

  private showMessage(severity: string, summary : string,  message: string) {
    this.messageService.add({ severity, summary: summary, detail: message });
  }
  
}
