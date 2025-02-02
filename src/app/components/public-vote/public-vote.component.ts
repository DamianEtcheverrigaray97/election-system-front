import { Component } from '@angular/core';
import { AppTopbarPublicComponent } from '../../layout/app-topbar-public/app-topbar-public.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidate } from '../../api/candidate.model';
import { VoteService } from '../../services/vote.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Message, MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageSeverity } from '../../enums/message.enum';
import { VoteMessageDetail, VoteError, VoteMessageSummary } from '../../enums/vote.enum';
@Component({
  selector: 'app-public-vote',
  imports: [
    AppTopbarPublicComponent,
    CardModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  templateUrl: './public-vote.component.html',
  styleUrl: './public-vote.component.scss'
})
export class PublicVoteComponent {

  vote = {
    document: null,
    candidate_id: null
  };

  candidates : Candidate[] = [];
  msgs: Message[] = [];
  voteForm!: FormGroup;
  
  constructor(
    private voteService: VoteService,
    private messageService: MessageService,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.voteForm = this.fb.group({
      document: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      candidate_id: [null, Validators.required]
    });

    this.loadCandidates();
  } 

  loadCandidates(){
    this.voteService.getAllVotableCandidates().subscribe({
      next: (response) => {
        if(response){
          this.candidates = response.data;
          this.candidates = this.candidates.map(candidate => ({
            ...candidate,
            fullName: `${candidate.name} ${candidate.lastName}`
        }));
        }
      },
      error: (error) => {
        this.showMessage(MessageSeverity.ERROR, VoteMessageSummary.UNKNOWN_ERROR, VoteMessageDetail.UNKNOWN_ERROR);
      }
    })
  }

  sendVote() {
    if (this.voteForm.invalid) {
      this.showMessage(MessageSeverity.ERROR, VoteMessageSummary.FORM_ERROR, VoteMessageDetail.FORM_ERROR);
      return;
    }

    this.voteService.vote(this.voteForm.value).subscribe({
      next: () => {
        this.showMessage(MessageSeverity.SUCCESS, VoteMessageSummary.VOTE_SUCCESS, VoteMessageDetail.VOTE_SUCCESS);
        this.voteForm.reset();
      },
      error: (response) => {
        let error = response.error.error;

        const errorMap: Record<string, { summary: VoteMessageSummary; detail: VoteMessageDetail }> = {
          [VoteError.VOTER_ALREADY_VOTED]: {
            summary: VoteMessageSummary.VOTE_ALREADY_REGISTERED,
            detail: VoteMessageDetail.VOTE_ALREADY_REGISTERED
          },
          [VoteError.VOTER_NOT_FOUND]: {
            summary: VoteMessageSummary.VOTER_NOT_FOUND,
            detail: VoteMessageDetail.VOTER_NOT_FOUND
          }
        };

        const errorMessage = errorMap[error] || {
          summary: VoteMessageSummary.UNKNOWN_ERROR,
          detail: VoteMessageDetail.UNKNOWN_ERROR
        };

        this.showMessage(MessageSeverity.ERROR, errorMessage.summary, errorMessage.detail);
      }
    });
  }

  private showMessage(severity: MessageSeverity, summary: VoteMessageSummary, detail: VoteMessageDetail, life: number = 4000) {
    this.messageService.add({ severity, summary, detail, life });
  }
  
}
