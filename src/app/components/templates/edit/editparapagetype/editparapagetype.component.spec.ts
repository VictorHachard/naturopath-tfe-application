import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditparapagetypeComponent} from './editparapagetype.component';

describe('EditparapagetypeComponent', () => {
  let component: EditparapagetypeComponent;
  let fixture: ComponentFixture<EditparapagetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditparapagetypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditparapagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
