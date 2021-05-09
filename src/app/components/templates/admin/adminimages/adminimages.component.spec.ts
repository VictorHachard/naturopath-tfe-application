import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminimagesComponent } from './adminimages.component';

describe('AdminimagesComponent', () => {
  let component: AdminimagesComponent;
  let fixture: ComponentFixture<AdminimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
