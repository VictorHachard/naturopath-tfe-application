import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminparagraphtypesComponent} from './adminparagraphtypes.component';

describe('AdminparagraphtypesComponent', () => {
  let component: AdminparagraphtypesComponent;
  let fixture: ComponentFixture<AdminparagraphtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminparagraphtypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminparagraphtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
