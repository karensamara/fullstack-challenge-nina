import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsLinechartComponent } from './months-linechart.component';

describe('MonthsLinechartComponent', () => {
  let component: MonthsLinechartComponent;
  let fixture: ComponentFixture<MonthsLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthsLinechartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthsLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
