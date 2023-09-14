import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MatTreeModule } from '@angular/material/tree';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponent2 } from './app.component-2';
 import { AppComponent4 } from './app.component-4';
import { AppComponentmain } from './app.component-3';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {NgToastModule} from 'ng-angular-popup';

import { NgFor, NgIf } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'app', component: AppComponent },
  { path: 'app2', component: AppComponent2 },
  { path: 'main', component: AppComponentmain },
   { path: 'app4', component: AppComponent4 },
];
@NgModule({
  declarations: [AppComponent, AppComponentmain, AppComponent2,AppComponent4],
  imports: [
    BrowserModule,
    MatListModule,
    MatRadioModule,
    NgToastModule,
    MatDividerModule,
    MatCheckboxModule,
    FormsModule,
    AppRoutingModule,
    CdkTreeModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    NgFor,
    NgIf,
    NoopAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes),
    MatSelectModule,
    ReactiveFormsModule,

  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
