import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Router } from '@angular/router';
import { Spares, SpareLog, ApiResponse, SpareStock } from '../../../_models';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  sparestock: Array<SpareStock>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     if (!window.localStorage.getItem('token')) {
    this.router.navigate(['../login']);
    return;
  }
  const storedRecords = window.localStorage.getItem('sparestock');
  const updated = window.localStorage.getItem('sparestock_updated');
  if (storedRecords && updated) {
      this.sparestock = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
  } else {
    this.sparestockRetrieve();
  }
}

sparestockRetrieve(): void {
  this.apiService.retrieveSpareStock().subscribe(data => {
    this.response = data;
    this.sparestock = this.response.payload;
    this.success = this.response.success;
    this.message = this.response.message;
    if (this.response.success) {
      window.localStorage.setItem('sparestock', JSON.stringify(this.response.payload));
      window.localStorage.setItem('sparestock_updated', JSON.stringify(new Date()));
    }
  });
}

sparestockDetail(sparestock: SpareStock): void {
  window.localStorage.removeItem('sparestockDetailId');
  window.localStorage.setItem('sparestockDetailId', sparestock.id);
  this.router.navigate(['spares/stock-detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to stock detail');
  return;
}

sparestockDelete(sparestock: SpareStock): void {
  this.apiService.deleteSpareStock(sparestock.id).subscribe( data => {
      this.sparestock = this.sparestock.filter(i => i.id !== sparestock.id);
      window.localStorage.setItem('sparestock', JSON.stringify(this.sparestock));
    });
}

sparestockEdit(sparestock: SpareStock): void {
  window.localStorage.removeItem('sparestockEditId');
  window.localStorage.setItem('sparestockEditId',sparestock.id);
  this.router.navigate(['spares/stock-edit']);
}

sparestockAdd(): void {
  this.router.navigate(['spares/stock-add']);
}

}
