import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditPage } from './category-edit.page';

describe('CategoryEditPage', () => {
  let component: CategoryEditPage;
  let fixture: ComponentFixture<CategoryEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
