import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddPage } from './category-add.page';

describe('CategoryAddPage', () => {
  let component: CategoryAddPage;
  let fixture: ComponentFixture<CategoryAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
