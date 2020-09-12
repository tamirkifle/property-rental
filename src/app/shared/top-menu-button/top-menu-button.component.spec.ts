import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuButtonComponent } from './top-menu-button.component';

describe('TopMenuButtonComponent', () => {
  let component: TopMenuButtonComponent;
  let fixture: ComponentFixture<TopMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
