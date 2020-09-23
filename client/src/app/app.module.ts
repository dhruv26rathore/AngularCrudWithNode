import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule
  ],
  providers: [HttpErrorHandler,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
