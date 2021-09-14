/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoreAspectCoverageByAttributesComponent } from './core-aspect-coverage-by-attributes.component';

describe('CoreAspectCoverageByAttributesComponent', () => {
  let component: CoreAspectCoverageByAttributesComponent;
  let fixture: ComponentFixture<CoreAspectCoverageByAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreAspectCoverageByAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreAspectCoverageByAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
