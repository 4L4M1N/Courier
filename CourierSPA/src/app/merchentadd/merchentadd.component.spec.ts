/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MerchentaddComponent } from './merchentadd.component';

describe('MerchentaddComponent', () => {
  let component: MerchentaddComponent;
  let fixture: ComponentFixture<MerchentaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchentaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchentaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
