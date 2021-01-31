import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddparatagtypeComponent} from './addparatagtype.component';

describe('AddparatagtypeComponent', () => {
  let component: AddparatagtypeComponent;
  let fixture: ComponentFixture<AddparatagtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddparatagtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparatagtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
