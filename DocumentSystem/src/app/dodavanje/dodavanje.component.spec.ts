import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeComponent } from './dodavanje.component';

describe('DodavanjeComponent', () => {
  let component: DodavanjeComponent;
  let fixture: ComponentFixture<DodavanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodavanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
