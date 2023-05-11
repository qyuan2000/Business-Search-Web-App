import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs'; 
import { GoogleMapsModule } from '@angular/google-maps';


import { SearchComponent } from './search/search.component';
import { BookingsComponent } from './bookings/bookings.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SearchformComponent } from './searchform/searchform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResulttableComponent } from './resulttable/resulttable.component';
import { DetailcardComponent } from './detailcard/detailcard.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingsComponent,
    TopNavbarComponent,
    SearchformComponent,
    ResulttableComponent,
    DetailcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTabsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
