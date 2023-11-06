import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvaComponent } from './prva.component';

describe('PrvaComponent', () => {
  let component: PrvaComponent;
  let fixture: ComponentFixture<PrvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
