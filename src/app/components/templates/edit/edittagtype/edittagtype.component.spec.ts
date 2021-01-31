import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EdittagtypeComponent} from './edittagtype.component';

describe('EdittagtypeComponent', () => {
  let component: EdittagtypeComponent;
  let fixture: ComponentFixture<EdittagtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittagtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittagtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
