import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazAktivnostiComponent } from './prikaz-aktivnosti.component';

describe('PrikazAktivnostiComponent', () => {
  let component: PrikazAktivnostiComponent;
  let fixture: ComponentFixture<PrikazAktivnostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazAktivnostiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazAktivnostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
