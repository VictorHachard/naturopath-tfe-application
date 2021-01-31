import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditparagraphtypeComponent} from './editparagraphtype.component';

describe('EditparagraphtypeComponent', () => {
  let component: EditparagraphtypeComponent;
  let fixture: ComponentFixture<EditparagraphtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditparagraphtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditparagraphtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
