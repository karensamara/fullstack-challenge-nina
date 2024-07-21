import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrenceDetailsComponent } from './occurrence-details.component';

describe('OccurrenceDetailsComponent', () => {
  let component: OccurrenceDetailsComponent;
  let fixture: ComponentFixture<OccurrenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccurrenceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccurrenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
