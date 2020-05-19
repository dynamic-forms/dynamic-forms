import { NgModule } from '@angular/core';
import { CodeUrlPipe } from './code-url.pipe';

@NgModule({
  declarations: [
    CodeUrlPipe
  ],
  exports: [
    CodeUrlPipe
  ]
})
export class HeaderPipesModule {}
