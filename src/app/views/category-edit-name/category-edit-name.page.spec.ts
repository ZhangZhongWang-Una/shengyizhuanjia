import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditNamePage } from './category-edit-name.page';

describe('CategoryEditNamePage', () => {
  let component: CategoryEditNamePage;
  let fixture: ComponentFixture<CategoryEditNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryEditNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEditNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
