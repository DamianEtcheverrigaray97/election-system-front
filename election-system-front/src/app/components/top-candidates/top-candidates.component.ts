import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-top-candidates',
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './top-candidates.component.html',
  styleUrl: './top-candidates.component.scss'
})
export class TopCandidatesComponent {
  visibleMember: number = -1;
}
