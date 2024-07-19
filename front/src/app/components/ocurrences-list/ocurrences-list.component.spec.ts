import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcurrencesListComponent } from './ocurrences-list.component';

describe('OcurrencesListComponent', () => {
  let component: OcurrencesListComponent;
  let fixture: ComponentFixture<OcurrencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcurrencesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcurrencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
