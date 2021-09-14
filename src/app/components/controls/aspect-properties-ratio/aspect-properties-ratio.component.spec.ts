/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AspectPropertiesRatioComponent } from './aspect-properties-ratio.component';

describe('AspectPropertiesRatioComponent', () => {
  let component: AspectPropertiesRatioComponent;
  let fixture: ComponentFixture<AspectPropertiesRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspectPropertiesRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectPropertiesRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
