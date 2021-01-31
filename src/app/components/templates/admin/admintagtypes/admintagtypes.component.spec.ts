import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdmintagtypesComponent} from './admintagtypes.component';

describe('AdmintagtypesComponent', () => {
  let component: AdmintagtypesComponent;
  let fixture: ComponentFixture<AdmintagtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintagtypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintagtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
