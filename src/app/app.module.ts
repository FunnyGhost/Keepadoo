import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { CoreModule } from './movie-lists/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, CallbackComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, NgbModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
