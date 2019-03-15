import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SelectModule } from 'ng2-select';
import { NgSelectModule } from '@ng-select/ng-select';

import { SparesRoutingModule } from './spares-routing.module';
import { SparesComponent } from './spares.component';
import { SparesAddComponent } from './spares-add/spares-add.component';
import { SparesEditComponent } from './spares-edit/spares-edit.component';
import { SparesDetailComponent } from './spares-detail/spares-detail.component';
import { CategoryComponent } from './category/category.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { LocationComponent } from './location/location.component';
import { LogComponent } from './log/log.component';
import { RequestComponent } from './request/request.component';
import { TransferComponent } from './transfer/transfer.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { DictionaryAddComponent } from './dictionary/dictionary-add/dictionary-add.component';
import { DictionaryEditComponent } from './dictionary/dictionary-edit/dictionary-edit.component';
import { DictionaryDetailComponent } from './dictionary/dictionary-detail/dictionary-detail.component';
import { LocationAddComponent } from './location/location-add/location-add.component';
import { LocationEditComponent } from './location/location-edit/location-edit.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { LogAddComponent } from './log/log-add/log-add.component';
import { LogEditComponent } from './log/log-edit/log-edit.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { RequestAddComponent } from './request/request-add/request-add.component';
import { RequestEditComponent } from './request/request-edit/request-edit.component';
import { RequestDetailComponent } from './request/request-detail/request-detail.component';
import { TransferAddComponent } from './transfer/transfer-add/transfer-add.component';
import { TransferEditComponent } from './transfer/transfer-edit/transfer-edit.component';
import { TransferDetailComponent } from './transfer/transfer-detail/transfer-detail.component';
import { StockComponent } from './stock/stock.component';
import { StockAddComponent } from './stock/stock-add/stock-add.component';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { StockDetailComponent } from './stock/stock-detail/stock-detail.component';

@NgModule({
  declarations: [
    SparesComponent, SparesAddComponent, 
    SparesEditComponent, SparesDetailComponent, 
    CategoryComponent, DictionaryComponent, LocationComponent,
    LogComponent, RequestComponent, TransferComponent, CategoryAddComponent, 
    CategoryEditComponent, CategoryDetailComponent, DictionaryAddComponent,
    DictionaryEditComponent, DictionaryDetailComponent, 
    LocationAddComponent, LocationEditComponent, LocationDetailComponent, 
    LogAddComponent, LogEditComponent, LogDetailComponent,
    RequestAddComponent, RequestEditComponent, RequestDetailComponent,
    TransferAddComponent, TransferEditComponent, TransferDetailComponent,
    StockComponent, StockAddComponent, StockEditComponent, StockDetailComponent
    ],
  imports: [
    CommonModule,
    SparesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //SelectModule,
    NgSelectModule
  ]
})
export class SparesModule {
 }
