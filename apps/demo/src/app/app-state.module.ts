import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    })
  ]
})
export class AppStateModule {}
