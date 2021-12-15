import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book2/book-list/book-list.component';
import { BookRowComponent } from './book2/book-row/book-row.component';
import { BookDetailsComponent } from './book2/book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleFormComponent } from './book2/sample-form/sample-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookFormComponent } from './book2/book-form/book-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { jwtInterceptorService } from './helper/jwtinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    BookRowComponent,
    BookDetailsComponent,
    SampleFormComponent,
    BookFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: jwtInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
