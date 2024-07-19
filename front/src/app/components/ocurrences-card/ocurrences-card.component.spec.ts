import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcurrencesCardComponent } from './ocurrences-card.component';

describe('OcurrencesCardComponent', () => {
  let component: OcurrencesCardComponent;
  let fixture: ComponentFixture<OcurrencesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcurrencesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcurrencesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
