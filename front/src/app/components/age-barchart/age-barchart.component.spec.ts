import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeBarchartComponent } from './age-barchart.component';

describe('AgeBarchartComponent', () => {
  let component: AgeBarchartComponent;
  let fixture: ComponentFixture<AgeBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
