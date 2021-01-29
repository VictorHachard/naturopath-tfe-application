import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincategoriesComponent } from './admincategories.component';

describe('AdmincategoriesComponent', () => {
  let component: AdmincategoriesComponent;
  let fixture: ComponentFixture<AdmincategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
