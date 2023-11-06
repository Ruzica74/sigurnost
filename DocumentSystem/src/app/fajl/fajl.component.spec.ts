import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FajlComponent } from './fajl.component';

describe('FajlComponent', () => {
  let component: FajlComponent;
  let fixture: ComponentFixture<FajlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FajlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FajlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
