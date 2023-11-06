import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleStrComponent } from './google-str.component';

describe('GoogleStrComponent', () => {
  let component: GoogleStrComponent;
  let fixture: ComponentFixture<GoogleStrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleStrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
