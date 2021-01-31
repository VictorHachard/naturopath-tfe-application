import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminparapagetypesComponent} from './adminparapagetypes.component';

describe('AdminparapagetypesComponent', () => {
  let component: AdminparapagetypesComponent;
  let fixture: ComponentFixture<AdminparapagetypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminparapagetypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminparapagetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
