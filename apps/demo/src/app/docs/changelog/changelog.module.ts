import { NgModule } from '@angular/core';
import { MarkdownModule } from '../../markdown/markdown.module';
import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogComponent } from './changelog.component';

@NgModule({
  declarations: [
    ChangelogComponent
  ],
  imports: [
    ChangelogRoutingModule,
    MarkdownModule
  ]
})
export class ChangelogModule {}
