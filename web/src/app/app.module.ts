import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './shared/data.service';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule, 
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.components
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }