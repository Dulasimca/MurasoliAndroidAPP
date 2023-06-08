import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMaranComponent } from './about-maran.component';

describe('AboutMaranComponent', () => {
  let component: AboutMaranComponent;
  let fixture: ComponentFixture<AboutMaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMaranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
