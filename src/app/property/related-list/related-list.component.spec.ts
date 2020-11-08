import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedListComponent } from './related-list.component';

describe('RelatedListComponent', () => {
  let component: RelatedListComponent;
  let fixture: ComponentFixture<RelatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
