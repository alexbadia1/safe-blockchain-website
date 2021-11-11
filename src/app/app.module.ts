import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilteredBlockComponent } from './components/filtered-block/filtered-block.component';
import { RawBlockComponent } from './components/raw-block/raw-block.component';
import { RawBlockListViewComponent } from './components/raw-block-list-view/raw-block-list-view.component';
import { FilteredBlockListViewComponent } from './components/filtered-block-list-view/filtered-block-list-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    FilteredBlockComponent,
    RawBlockComponent,
    RawBlockListViewComponent,
    FilteredBlockListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
