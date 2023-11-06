import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreiranjeKlijentaComponent } from './kreiranje-klijenta.component';

describe('KreiranjeKlijentaComponent', () => {
  let component: KreiranjeKlijentaComponent;
  let fixture: ComponentFixture<KreiranjeKlijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreiranjeKlijentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KreiranjeKlijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
