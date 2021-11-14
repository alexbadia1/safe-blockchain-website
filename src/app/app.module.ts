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
import { PeerListViewComponent } from './security/components/peer-list-view/peer-list-view.component';
import { BlockComponent } from './security/components/block/block.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PeersComponent } from './security/components/peers/peers.component';
import { SecurityDemoButtonComponent } from './components/buttons/security-demo-button/security-demo-button.component';
import { HomeButtonComponent } from './components/buttons/home-button/home-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    FilteredBlockComponent,
    RawBlockComponent,
    RawBlockListViewComponent,
    FilteredBlockListViewComponent,
    PeerListViewComponent,
    BlockComponent,
    PeersComponent,
    SecurityDemoButtonComponent,
    HomeButtonComponent
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
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
