import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JedanComponent } from './jedan.component';

describe('JedanComponent', () => {
  let component: JedanComponent;
  let fixture: ComponentFixture<JedanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JedanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JedanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
