import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateNewsComponent } from './state-news.component';

describe('StateNewsComponent', () => {
  let component: StateNewsComponent;
  let fixture: ComponentFixture<StateNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
