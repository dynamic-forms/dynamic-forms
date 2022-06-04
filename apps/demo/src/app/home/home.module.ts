import { NgModule } from '@angular/core';
import { MarkdownModule } from '../markdown/markdown.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    MarkdownModule,
  ],
})
export class HomeModule {}
