import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreiranjeAdminDComponent } from './kreiranje-admin-d.component';

describe('KreiranjeAdminDComponent', () => {
  let component: KreiranjeAdminDComponent;
  let fixture: ComponentFixture<KreiranjeAdminDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreiranjeAdminDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KreiranjeAdminDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
