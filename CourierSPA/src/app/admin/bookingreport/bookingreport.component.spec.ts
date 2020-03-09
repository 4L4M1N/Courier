/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookingreportComponent } from './bookingreport.component';

describe('BookingreportComponent', () => {
  let component: BookingreportComponent;
  let fixture: ComponentFixture<BookingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
