import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogDemoComponent } from './confirmation-dialog-demo.component';

describe('ConfirmationDialogDemoComponent', () => {
  let component: ConfirmationDialogDemoComponent;
  let fixture: ComponentFixture<ConfirmationDialogDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmationDialogDemoComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDialogDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
