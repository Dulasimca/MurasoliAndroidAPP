import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperReaderComponent } from './paper-reader.component';

describe('PaperReaderComponent', () => {
  let component: PaperReaderComponent;
  let fixture: ComponentFixture<PaperReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
