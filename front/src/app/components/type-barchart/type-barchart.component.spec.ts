import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBarchartComponent } from './type-barchart.component';

describe('TypeBarchartComponent', () => {
  let component: TypeBarchartComponent;
  let fixture: ComponentFixture<TypeBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
