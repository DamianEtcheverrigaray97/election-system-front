import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Vote } from '../../api/vote';
import { VoteService } from '../../services/vote.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { VoteDetails } from '../../api/voteDetail';

@Component({
  selector: 'app-votes-list',
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule, 
    TableModule, 
    InputTextModule, 
    ToggleButtonModule, 
    TooltipModule,
    DialogModule
  ],
  templateUrl: './votes-list.component.html',
  styleUrl: './votes-list.component.scss'
})
export class VotesListComponent {
  
  @ViewChild('filter') filter!: ElementRef;
  
  loadingVotes: boolean = true;
  displayModal: boolean = false;
  votesList: Vote[] = [];
  selectedVote: VoteDetails | undefined = undefined;

  constructor(private VoteService : VoteService){ }

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates(){
    this.VoteService.getVotes().subscribe({
      next: (response) => {
        if(response){
          this.votesList = response.data;
        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.loadingVotes = false;
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  openVoteDialog(voteId : number){
    this.displayModal = true;

    this.VoteService.getVoteById(voteId).subscribe({
      next: (response) => {
        if(response){
          this.selectedVote = response.data;
        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.loadingVotes = false;
      }
    })
  }

  closeDialog(){
    this.displayModal = false;
    this.selectedVote = undefined;
  }
}
