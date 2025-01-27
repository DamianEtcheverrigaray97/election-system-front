import { Component } from '@angular/core';
import { AppTopbarComponent } from '../../layout/app-topbar/app-topbar.component';
import { AppTopbarPublicComponent } from '../../layout/app-topbar-public/app-topbar-public.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../api/candidate.model';
import { VoteService } from '../../services/vote.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
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
    MessagesModule
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
  msgs: any[] = [];

  constructor(
    private VoteService: VoteService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.loadCandidates();
  } 

  loadCandidates(){
    this.VoteService.getAllVotableCandidates().subscribe({
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
        console.log(error)
      },
      complete: () => {
        // this.loading = false;
      }
    })
  }

  sendVote(){
    console.log('Voto enviado:', this.vote);
    this.VoteService.vote(this.vote).subscribe({
      next: (response) => {
        console.log(response)
        if(response){
          this.messageService.add({
            severity: 'success',  
            summary: 'Voto Enviado -',  
            detail: 'Tu voto ha sido registrado correctamente.'
          });
          this.resetForm();
        }
      },
      error: (response) => {
        let error = response.error.error;
        if (error === 'Voter has already voted') {
          this.messageService.add({
            severity: 'error',
            summary: 'Voto ya registrado -',
            detail: 'No puedes votar más de una vez.',
            life: 4000  
          });
        } else if (error === 'Voter not found') {
          this.messageService.add({
            severity: 'error',
            summary: 'Error -',
            detail: 'El votante no fue encontrado.',
            life: 4000   
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error desconocido -',
            detail: 'Ha ocurrido un error. Intente nuevamente.' 
          });
        }
    
      },
      complete: () => {
      }
    })
  }

  resetForm() {
    this.vote = {
      document: null,
      candidate_id: null
    };
  }
}
