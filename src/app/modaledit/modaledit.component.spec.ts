import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditComponent } from './modaledit.component';

describe('ModaleditComponent', () => {
  let component: ModaleditComponent;
  let fixture: ComponentFixture<ModaleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
