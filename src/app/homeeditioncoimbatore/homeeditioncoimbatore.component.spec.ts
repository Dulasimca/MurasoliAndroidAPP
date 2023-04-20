import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeeditioncoimbatoreComponent } from './homeeditioncoimbatore.component';

describe('HomeeditioncoimbatoreComponent', () => {
  let component: HomeeditioncoimbatoreComponent;
  let fixture: ComponentFixture<HomeeditioncoimbatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeeditioncoimbatoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeeditioncoimbatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
