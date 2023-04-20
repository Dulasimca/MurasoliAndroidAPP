import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPaperComponent } from './e-paper.component';

describe('EPaperComponent', () => {
  let component: EPaperComponent;
  let fixture: ComponentFixture<EPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EPaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
