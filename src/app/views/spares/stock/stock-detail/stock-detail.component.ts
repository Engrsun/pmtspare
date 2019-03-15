import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../../_services';
import { SpareStock } from '../../../../_models';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {
  sparestocks: Array<SpareStock>;
  sparestock: SpareStock;

    id = '';
    name =''; // string;
    spare_location_id = ''; //string
    spare_dictionary_id = ''; //string
    quantity = ''; //number;
    stock_in = ''; //number;
    stock_out = ''; //number;

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }


  ngOnInit() {
    const sparestockId = window.localStorage.getItem('sparestockDetailId');
    if (!sparestockId) {
      alert('Invalid action.');
      this.router.navigate(['/spares/stock']); // list-spare stock
      return;
    }

    this.sparestock = this.utilsService.cleanObject(this.getRecord(sparestockId));

    this.id = this.sparestock.id || '';
    this.spare_location_id = this.sparestock.spare_location_id ||''; // string;
    this.spare_dictionary_id = this.sparestock.spare_dictionary_id || ''; //string;
    this.quantity = this.sparestock.quantity.toString(10); //number;
    this.stock_in = this.sparestock.stock_in.toString(10); //number;
    this.stock_out = this.sparestock.stock_out.toString(10); //number;
    

    console.log('\nSpareStock Name', typeof this.sparestock, this.sparestock);
  }

  getRecord(SpareStockId) {
    console.log('\nSpareStock Id ', SpareStockId);
    const storedRecords = window.localStorage.getItem('sparestock');
    const updated = window.localStorage.getItem('sparestock_updated');
    if (storedRecords) {
      this.sparestock = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getOneSpareStock(this.sparestock, SpareStockId);
    return t[0];
  }

  sparestockEdit(sparestock: SpareStock): void {
    window.localStorage.removeItem('sparestockEditId');
    window.localStorage.setItem('sparestockEditId', sparestock.id);
    this.router.navigate(['spares/stock-edit']);
  }

  sparestockAdd(): void {
    this.router.navigate(['spares/stock-add']);
  }

  goBack() {
    this.router.navigate(['/spares/stock']);
  }

}
