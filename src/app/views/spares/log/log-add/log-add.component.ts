import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../_services';
import { SpareLog, Spares, ApiResponse, SelectOptionInterface } from '../../../../_models';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.scss']
})
export class LogAddComponent implements OnInit {
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
    spare_id: [''], //string;
    location_id: [''], //string;
    quantity: [''], //number;
    transaction_code: [''], //string;
    description: [''], //string;
    order_type: [''], //string;
    spare_request_assignment_id: [''], //string;
    spare_sales_id: [''], //string;
    spare_purchase_id: [''], //string;
    spare_transfer_id: [''], //string;
    recipient_type: [''], //string;
    staff_recipient_id: [''], //string;
    driver_recipient_id: [''], //string;
    customer_recipient_id: [''], //string;
    supplier_recipient_id: [''], //string;
    spare_staff: [''], //string;
    spare_staff_remark: [''], //string;
    transaction_date: [''], //Date;
    });

   }

   onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    
    this.apiService.createSpareLog(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('sparelogDetailId', data.payload.id);
        this.router.navigate(['/spares/log-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['/spares/log']);
      });
  }

  goBack() {
    this.router.navigate(['/spares/log']);
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
