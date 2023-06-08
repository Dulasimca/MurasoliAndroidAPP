import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeeditiontrichyComponent } from './homeeditiontrichy.component';

describe('HomeeditiontrichyComponent', () => {
  let component: HomeeditiontrichyComponent;
  let fixture: ComponentFixture<HomeeditiontrichyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeeditiontrichyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeeditiontrichyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
