import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesListComponent } from './votes-list.component';

describe('VotesListComponent', () => {
  let component: VotesListComponent;
  let fixture: ComponentFixture<VotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
