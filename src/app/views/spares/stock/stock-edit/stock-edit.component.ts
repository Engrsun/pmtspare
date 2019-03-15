import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface,
         Spares, SpareStock 
        } from '../../../../_models';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {
  sparestocks: Array<SpareStock>;
  sparestock: SpareStock;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  
    ngOnInit() {
      const sparestockId = window.localStorage.getItem('sparestockEditId');
      if (!sparestockId) {
        alert('Invalid action.');
        this.router.navigate(['spares/stock']); // list spare stock
        return;
    }
  
    this.editForm = this.formBuilder.group({
  
      id: [''], //string;
      name: [''], // string;
      spare_location_id: [''], //string
      spare_dictionary_id: [''], //string
      quantity: [''], //number;
      stock_in: [''], //number
      stock_out: [''], //number
      });
  
      this.sparestock = this.utilsService.cleanObject(this.getRecord(sparestockId));
  
      this.editForm.get('spare_location_id').setValue(this.sparestock.spare_location_id || '');
      this.editForm.get('spare_dictionary_id').setValue(this.sparestock.spare_dictionary_id || '');
      this.editForm.get('quantity').setValue(this.sparestock.quantity.toString(10));
      this.editForm.get('stock_in').setValue(this.sparestock.stock_in.toString(10));
      this.editForm.get('stock_out').setValue(this.sparestock.stock_out.toString(10));
      console.log('\nSpareStock Name', typeof this.sparestock, this.sparestock);
    }
      onSubmit() {
        const payload = this.editForm.value;
        payload.id = this.sparestock.id;
        console.log('editForm payload ', payload);
        this.apiService.updateSpareStock(payload).pipe(first()).subscribe(data => {
              this.response = data;
              this.sparestock = this.response.payload;
              if (this.response.success) {
                alert('Spare Stock updated successfully.');
                this.router.navigate(['spares/stock']); // list-spare
                // Update Local Content
               // window.localStorage.setItem('spare stock', JSON.stringify(this.response.payload));
                window.localStorage.setItem('sparestock_updated', JSON.stringify(new Date()));
              } else {
                alert(this.response.message);
              }
  
  
            },
            error => {
              alert(error);
            });
      }
  
      getRecord(sparestockId) {
        console.log('\nsparestock Id ', sparestockId);
        const storedRecords = window.localStorage.getItem('sparestock');
        const updated = window.localStorage.getItem('sparestock_updated');
        if (storedRecords) {
            this.sparestock = JSON.parse(storedRecords);
            console.log(`Records retrieved since ${updated}`);
        }
        const t = this.apiService.getOneSpareStock(this.sparestock, sparestockId);
        return t[0];
      }
  
      sparestockAdd(): void {
        this.router.navigate(['spares/stock-add']);
      }
  
      goBack() {
        this.router.navigate(['spares/stock']);
      }
  
      public selected(value: any): void {
        console.log('Selected value is: ', value);
      }
  
      public removed(value: any): void {
        console.log('Removed value is: ', value);
      }
  
      public typed(value: any): void {
        console.log('New search input: ', value);
      }
  
      public refreshValue(value: any): void {
        this.value = value;
      }

}
