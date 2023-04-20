import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeeditionmaduraiComponent } from './homeeditionmadurai.component';

describe('HomeeditionmaduraiComponent', () => {
  let component: HomeeditionmaduraiComponent;
  let fixture: ComponentFixture<HomeeditionmaduraiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeeditionmaduraiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeeditionmaduraiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
