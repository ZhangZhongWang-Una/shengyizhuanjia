import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplySelectPage } from './supply-select.page';

describe('SupplySelectPage', () => {
  let component: SupplySelectPage;
  let fixture: ComponentFixture<SupplySelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplySelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplySelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
