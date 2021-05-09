import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpagesComponent } from './adminpages.component';

describe('AdminpagesComponent', () => {
  let component: AdminpagesComponent;
  let fixture: ComponentFixture<AdminpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
