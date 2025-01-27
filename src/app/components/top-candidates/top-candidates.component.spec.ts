import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCandidatesComponent } from './top-candidates.component';

describe('TopCandidatesComponent', () => {
  let component: TopCandidatesComponent;
  let fixture: ComponentFixture<TopCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCandidatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
