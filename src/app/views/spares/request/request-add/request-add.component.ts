import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../_services';
import { SpareRequest, Spares, ApiResponse, SelectOptionInterface } from '../../../../_models';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.scss']
})
export class RequestAddComponent implements OnInit {

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
    code: [''], // string;
    pmt_maintenance_id:	[''], //string;
    spare_id: [''], //string;
    quantity: [''], //Number;
    request_date: [''], //Date;
    user_type:	[''], //string;
    recipient_staff_id:	[''], //string;
    recipient_driver_id: [''], //string;
    vehicle_id:	[''], //string;
    description: [''], //string;
    approved_date: [''], //Date;
    approved_by: [''], //string	;
    issued_date: [''], //Date;
    issued_by:	[''], //string;
    issuer_remark: [''], //string;
    location_id: [''], //string;
    request_status:	[''], //string;
    issue_status: [''], //string;
    });

   }

   onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    
    this.apiService.createSpareRequest(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('sparerequestDetailId', data.payload.id);
        this.router.navigate(['/spares/request-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['/spares/request']);
      });
  }

  goBack() {
    this.router.navigate(['/spares/request']);
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
