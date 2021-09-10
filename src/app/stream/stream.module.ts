import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {StreamListComponent} from './stream-list/stream-list.component';
import {StreamPageComponent} from './stream-page/stream-page.component';
import {ChatModule} from './chat/chat.module';
import {AppRoutingModule} from '../app-routing.module';
import {AppModule} from '../app.module';
import { StreamPageMetaComponent } from './stream-page-meta/stream-page-meta.component';
import { StreamPageInfoComponent } from './stream-page-info/stream-page-info.component';

@NgModule({
  declarations: [
    StreamListComponent,
    StreamPageComponent,
    StreamPageMetaComponent,
    StreamPageInfoComponent,
  ],
    imports: [
        SharedModule,
        CommonModule,
        ChatModule,
        AppRoutingModule,
        AppModule
    ]
})
export class StreamModule { }
