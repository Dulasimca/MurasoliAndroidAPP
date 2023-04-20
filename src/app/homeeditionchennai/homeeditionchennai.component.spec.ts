import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeeditionchennaiComponent } from './homeeditionchennai.component';

describe('HomeeditionchennaiComponent', () => {
  let component: HomeeditionchennaiComponent;
  let fixture: ComponentFixture<HomeeditionchennaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeeditionchennaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeeditionchennaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
