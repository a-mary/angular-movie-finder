import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistButtonComponent } from './watchlist-button.component';

describe('WatchlistButtonComponent', () => {
  let component: WatchlistButtonComponent;
  let fixture: ComponentFixture<WatchlistButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
