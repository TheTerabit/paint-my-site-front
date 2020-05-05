import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallAboutComponent } from './small-about.component';

describe('SmallAboutComponent', () => {
  let component: SmallAboutComponent;
  let fixture: ComponentFixture<SmallAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
