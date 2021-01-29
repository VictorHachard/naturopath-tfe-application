import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditparatagtypeComponent } from './editparatagtype.component';

describe('EditparatagtypeComponent', () => {
  let component: EditparatagtypeComponent;
  let fixture: ComponentFixture<EditparatagtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditparatagtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditparatagtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
