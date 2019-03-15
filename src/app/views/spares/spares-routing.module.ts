import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SparesComponent } from './spares.component';
import { SparesDetailComponent } from './spares-detail/spares-detail.component';
import { SparesEditComponent } from './spares-edit/spares-edit.component';
import { SparesAddComponent } from './spares-add/spares-add.component';
import { CategoryComponent } from './category/category.component';
import { StockComponent } from './stock/stock.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { LocationComponent } from './location/location.component';
import { LogComponent } from './log/log.component';
import { RequestComponent } from './request/request.component';
import { TransferComponent } from './transfer/transfer.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { LocationEditComponent } from './location/location-edit/location-edit.component';
import { LocationAddComponent } from './location/location-add/location-add.component';
import { LogAddComponent } from './log/log-add/log-add.component';
import { LogDetailComponent } from './log/log-detail/log-detail.component';
import { LogEditComponent } from './log/log-edit/log-edit.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { StockAddComponent } from './stock/stock-add/stock-add.component';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';
import { StockDetailComponent } from './stock/stock-detail/stock-detail.component';
import { TransferAddComponent } from './transfer/transfer-add/transfer-add.component';
import { TransferEditComponent } from './transfer/transfer-edit/transfer-edit.component';
import { TransferDetailComponent } from './transfer/transfer-detail/transfer-detail.component';
import { RequestAddComponent } from './request/request-add/request-add.component';
import { RequestDetailComponent } from './request/request-detail/request-detail.component';
import { RequestEditComponent } from './request/request-edit/request-edit.component';


const routes: Routes = [
  { path: '', component: SparesComponent, data: { title: 'Spares' } },
  { path: 'spares-detail', component: SparesDetailComponent, data: { title: 'Spares Detail' } },
  { path: 'spares-edit', component: SparesEditComponent, data: { title: 'Spares Edit' } },
  { path: 'spares-add', component: SparesAddComponent, data: { title: 'Spares Add' } },
  { path: 'category', component: CategoryComponent, data: { title: 'Spares Category' } },
  { path: 'category-add', component: CategoryAddComponent, data: { title: 'Spares Category Add' } },
  { path: 'category-edit', component: CategoryEditComponent, data: { title: 'Spares Category Edit' } },
  { path: 'category-detail', component: CategoryDetailComponent, data: { title: 'Spares Category Detail' } },
  { path: 'stock', component: StockComponent, data: { title: 'Spares Stock' } },
  { path: 'stock-add', component: StockAddComponent, data: { title: 'Spares Stock Add' } },
  { path: 'stock-edit', component: StockEditComponent, data: { title: 'Spares Stock Edit' } },
  { path: 'stock-detail', component: StockDetailComponent, data: { title: 'Spares Stock Detail' } },
  { path: 'dictionary', component: DictionaryComponent, data: { title: 'Spares Dictionary' } },
  { path: 'location', component: LocationComponent, data: { title: 'Spares Location' } },
  { path: 'location-detail', component: LocationDetailComponent, data: { title: 'Spares Location Detail' } },
  { path: 'location-edit', component: LocationEditComponent, data: { title: 'Spares Location Edit' } },
  { path: 'location-add', component: LocationAddComponent, data: { title: 'Spares Location Add' } },
  { path: 'log', component: LogComponent, data: { title: 'Spares Log' } },
  { path: 'log-add', component: LogAddComponent, data: { title: 'Spares Log Add' } },
  { path: 'log-detail', component: LogDetailComponent, data: { title: 'Spares Log Detail' } },
  { path: 'log-edit', component: LogEditComponent, data: { title: 'Spares Log Edit' } },
  { path: 'request', component: RequestComponent, data: { title: 'Spares Request' } },
  { path: 'request-add', component: RequestAddComponent, data: { title: 'Spares Request Add' } },
  { path: 'request-detail', component: RequestDetailComponent, data: { title: 'Spares Request Detail' } },
  { path: 'request-edit', component: RequestEditComponent, data: { title: 'Spares Request Edit' } },
  { path: 'transfer', component: TransferComponent, data: { title: 'Spares Transfer' } },
  { path: 'transfer-add', component: TransferAddComponent, data: { title: 'Spares transfer Add' } },
  { path: 'transfer-detail', component: TransferDetailComponent, data: { title: 'Spares transfer Detail' } },
  { path: 'transfer-edit', component: TransferEditComponent, data: { title: 'Spares transfer Edit' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparesRoutingModule { }
