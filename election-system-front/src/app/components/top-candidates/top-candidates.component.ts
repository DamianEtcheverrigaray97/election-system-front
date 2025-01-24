import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../api/candidate.model';
import { ChartModule } from 'primeng/chart';
import { VoteService } from '../../services/Votes.service';
@Component({
  selector: 'app-top-candidates',
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule, 
    TableModule, 
    RatingModule, 
    SliderModule, 
    InputTextModule, 
    ToggleButtonModule, 
    RippleModule, 
    MultiSelectModule, 
    DropdownModule, 
    ProgressBarModule, 
    ChartModule
  ],
  templateUrl: './top-candidates.component.html',
  styleUrl: './top-candidates.component.scss'
})
export class TopCandidatesComponent {
  
  @ViewChild('filter') filter!: ElementRef;

  loading: boolean = true;
  candidateList: Candidate[] = [];
  pieData: any;
  pieOptions: any;

  constructor(private VoteService : VoteService){ }

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates(){
    this.VoteService.getMostVotesCandidates().subscribe({
      next: (response) => {
        if(response){
          this.candidateList = response.data;
          this.initChart();
        }
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.loading = false;
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

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const candidateNames = this.candidateList.map(candidate => `${candidate.name} ${candidate.lastName}`);
    const candidateVotes = this.candidateList.map(candidate => candidate.totalVotes);

    // Pie data and options
    this.pieData = {
        labels: candidateNames, // Nombres de los candidatos como etiquetas
        datasets: [
            {
                data: candidateVotes, // Votos totales de cada candidato
                backgroundColor: [
                    documentStyle.getPropertyValue('--primary-300'),
                    documentStyle.getPropertyValue('--orange-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                ],
                borderColor: surfaceBorder,
            },
        ],
    };

    this.pieOptions = {
        animation: {
            duration: 0,
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    padding: 14,
                    boxHeight: 15,
                    pointStyleWidth: 17,
                },
                position: 'bottom',
            },
        },
    };
  }

}
