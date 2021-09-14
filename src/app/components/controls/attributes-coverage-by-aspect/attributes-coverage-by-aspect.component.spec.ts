/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AttributesCoverageByAspectComponent } from './attributes-coverage-by-aspect.component';

describe('AttributesCoverageByAspectComponent', () => {
  let component: AttributesCoverageByAspectComponent;
  let fixture: ComponentFixture<AttributesCoverageByAspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesCoverageByAspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesCoverageByAspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
