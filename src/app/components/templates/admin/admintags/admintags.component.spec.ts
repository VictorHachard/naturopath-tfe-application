import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintagsComponent } from './admintags.component';

describe('AdmintagsComponent', () => {
  let component: AdmintagsComponent;
  let fixture: ComponentFixture<AdmintagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
