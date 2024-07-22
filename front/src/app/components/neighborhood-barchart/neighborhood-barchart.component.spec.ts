import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodBarchartComponent } from './neighborhood-barchart.component';

describe('NeighborhoodBarchartComponent', () => {
  let component: NeighborhoodBarchartComponent;
  let fixture: ComponentFixture<NeighborhoodBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeighborhoodBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
