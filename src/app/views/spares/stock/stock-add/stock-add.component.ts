import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../_services';
import { 
          SpareStock, Spares, ApiResponse, 
          SelectOptionInterface 
        } from '../../../../_models';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.scss']
})
export class StockAddComponent implements OnInit {

  addForm: FormGroup;

  cities: SelectOptionInterface[];
  activeCity: SelectOptionInterface[];

  counties: SelectOptionInterface[];
  activeCounty: SelectOptionInterface[];

  private value = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
    id: [''], //string;
    name: [''], // string;
    spare_location_id: [''], //string
    spare_dictionary_id: [''], //string
    quantity: [''], //number;
    stock_in: [''], //number
    stock_out: [''], //number
    });

   }

   onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    
    this.apiService.createSpareStock(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('sparestockDetailId', data.payload.id);
        this.router.navigate(['/spares/stock-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['/spares/stock']);
      });
  }

  goBack() {
    this.router.navigate(['/spares/stock']);
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
