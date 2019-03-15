import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../_services';
import { 
          SpareTransfer, Spares, ApiResponse, 
          SelectOptionInterface 
        } from '../../../../_models';

@Component({
  selector: 'app-transfer-add',
  templateUrl: './transfer-add.component.html',
  styleUrls: ['./transfer-add.component.scss']
})
export class TransferAddComponent implements OnInit {

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
    code: [''], //string;
    spare_id: [''], //string;
    quantity: [''], //number;
    location_from: [''], //string;
    location_to: [''], //string;
    description: [''], //string;
    fulfilled_date: [''], //Date;
    fulfilled_by: [''], //string;
    confirmed_by: [''], //string;
    confirmed_date: [''], //Date;	
    transfer_status: [''], //string;
    });

   }

   onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    
    this.apiService.createSpareTransfer(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('sparetransferDetailId', data.payload.id);
        this.router.navigate(['/spares/transfer-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['/spares/transfer']);
      });
  }

  goBack() {
    this.router.navigate(['/spares/transfer']);
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
