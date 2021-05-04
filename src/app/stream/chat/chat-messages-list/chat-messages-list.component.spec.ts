import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesListComponent } from './chat-messages-list.component';

describe('ChatMessagesListComponent', () => {
  let component: ChatMessagesListComponent;
  let fixture: ComponentFixture<ChatMessagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
