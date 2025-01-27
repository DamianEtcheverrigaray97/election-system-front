import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTopbarPublicComponent } from './app-topbar-public.component';

describe('AppTopbarPublicComponent', () => {
  let component: AppTopbarPublicComponent;
  let fixture: ComponentFixture<AppTopbarPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTopbarPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTopbarPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
