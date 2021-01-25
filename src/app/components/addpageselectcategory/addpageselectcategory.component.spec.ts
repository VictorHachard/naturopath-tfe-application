import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddpageselectcategoryComponent} from './addpageselectcategory.component';

describe('AddpageselectcategoryComponent', () => {
  let component: AddpageselectcategoryComponent;
  let fixture: ComponentFixture<AddpageselectcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpageselectcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpageselectcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
