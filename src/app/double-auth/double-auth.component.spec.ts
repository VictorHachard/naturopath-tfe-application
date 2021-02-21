import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleAuthComponent } from './double-auth.component';

describe('DoubleAuthComponent', () => {
  let component: DoubleAuthComponent;
  let fixture: ComponentFixture<DoubleAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
