import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { Voter } from '../../api/voter';
import { ButtonModule } from 'primeng/button';
import { VoterService } from '../../services/voter.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageSeverity } from '../../enums/message.enum';
import { VoterMessageSummary, VoterMessageDetail, VoterError } from '../../enums/voter.enum';
@Component({
  selector: 'app-add-voter',
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    CalendarModule,
    ButtonModule,
    ToastModule
  ],
  providers: [
    MessageService,
  ],
  templateUrl: './add-voter.component.html',
  styleUrl: './add-voter.component.scss'
})
export class AddVoterComponent {

  addVoterForm!: FormGroup;

  genderOptions: { label: string, value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private VoterService : VoterService,
    private messageService: MessageService) {

    this.genderOptions = [
      { label: 'Masculino', value: 'male' },
      { label: 'Femenino', value: 'female' },
      { label: 'Otro', value: 'other' }
    ];

  }

  ngOnInit(): void {
    this.addVoterForm = this.fb.group({
      document: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      role: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addVoterForm.invalid) {
      this.showMessage(MessageSeverity.ERROR, VoterMessageSummary.ERROR, VoterError.FORM_ERROR);
      return;
    }

    const formValues = this.addVoterForm.value;

    const newVoter = new Voter(
      0,
      formValues.name,
      formValues.lastName,
      formValues.document,
      formValues.dob,
      formValues.role === 'candidate'
    );

    this.addVoter(newVoter);
  }

  get f() {
    return this.addVoterForm.controls;
  }

  addVoter(newVoter : Voter){
    this.VoterService.addVoter(newVoter).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.showMessage(MessageSeverity.SUCCESS, VoterMessageSummary.VOTE_SUCCESS, VoterMessageDetail.VOTER_ADDED_SUCCESS);
          this.addVoterForm.reset();
        }
      },
      error: (response) => {

        let error = response.error.error;

        if (error === VoterError.VOTER_ALREADY_EXIST) {
          this.showMessage(MessageSeverity.ERROR, VoterMessageSummary.ERROR, VoterMessageDetail.VOTER_ALREADY_EXIST);
        } else {
          this.showMessage(MessageSeverity.ERROR,VoterMessageSummary.UNKNOWN_ERROR,VoterMessageDetail.UNKNOWN_ERROR);
        }
      }
    });
  }

  private showMessage(severity: MessageSeverity, summary: VoterMessageSummary, detail: any, life: number = 4000) {
    this.messageService.add({ severity, summary, detail, life });
  }
}
