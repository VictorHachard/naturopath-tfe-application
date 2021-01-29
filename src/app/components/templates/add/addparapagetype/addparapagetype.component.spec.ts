import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparapagetypeComponent } from './addparapagetype.component';

describe('AddparapagetypeComponent', () => {
  let component: AddparapagetypeComponent;
  let fixture: ComponentFixture<AddparapagetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddparapagetypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparapagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
