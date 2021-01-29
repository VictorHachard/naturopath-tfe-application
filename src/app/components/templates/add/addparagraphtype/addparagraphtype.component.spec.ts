import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparagraphtypeComponent } from './addparagraphtype.component';

describe('AddparagraphtypeComponent', () => {
  let component: AddparagraphtypeComponent;
  let fixture: ComponentFixture<AddparagraphtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddparagraphtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparagraphtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
