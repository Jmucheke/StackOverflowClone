import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorPopupComponent } from './http-error-popup.component';

describe('HttpErrorPopupComponent', () => {
  let component: HttpErrorPopupComponent;
  let fixture: ComponentFixture<HttpErrorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpErrorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
