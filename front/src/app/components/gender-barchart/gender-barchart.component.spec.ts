import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderBarchartComponent } from './gender-barchart.component';

describe('GenderBarchartComponent', () => {
  let component: GenderBarchartComponent;
  let fixture: ComponentFixture<GenderBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
