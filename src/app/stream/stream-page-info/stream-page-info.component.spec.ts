import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPageInfoComponent } from './stream-page-info.component';

describe('StreamPageInfoComponent', () => {
  let component: StreamPageInfoComponent;
  let fixture: ComponentFixture<StreamPageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamPageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
