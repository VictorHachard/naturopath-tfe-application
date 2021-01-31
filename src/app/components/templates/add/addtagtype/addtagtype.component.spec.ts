import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddtagtypeComponent} from './addtagtype.component';

describe('AddtagtypeComponent', () => {
  let component: AddtagtypeComponent;
  let fixture: ComponentFixture<AddtagtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtagtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtagtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
