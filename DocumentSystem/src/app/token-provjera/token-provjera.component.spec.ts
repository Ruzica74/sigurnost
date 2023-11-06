import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenProvjeraComponent } from './token-provjera.component';

describe('TokenProvjeraComponent', () => {
  let component: TokenProvjeraComponent;
  let fixture: ComponentFixture<TokenProvjeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenProvjeraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenProvjeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
