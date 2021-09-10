import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPageMetaComponent } from './stream-page-meta.component';

describe('StreamPageMetaComponent', () => {
  let component: StreamPageMetaComponent;
  let fixture: ComponentFixture<StreamPageMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamPageMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPageMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
