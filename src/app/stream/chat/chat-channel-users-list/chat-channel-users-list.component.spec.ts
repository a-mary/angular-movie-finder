import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelUsersListComponent } from './chat-channel-users-list.component';

describe('ChatChannelUsersListComponent', () => {
  let component: ChatChannelUsersListComponent;
  let fixture: ComponentFixture<ChatChannelUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatChannelUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChannelUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
