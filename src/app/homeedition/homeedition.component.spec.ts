import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeeditionComponent } from './homeedition.component';

describe('HomeeditionComponent', () => {
  let component: HomeeditionComponent;
  let fixture: ComponentFixture<HomeeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeeditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
