import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminparatagtypesComponent } from './adminparatagtypes.component';

describe('AdminparatagtypesComponent', () => {
  let component: AdminparatagtypesComponent;
  let fixture: ComponentFixture<AdminparatagtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminparatagtypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminparatagtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
