import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface, Spares, SpareRequest } from '../../../../_models';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.scss']
})
export class RequestEditComponent implements OnInit {

  
  sparerequests: Array<SpareRequest>;
  sparerequest: SpareRequest;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  
    ngOnInit() {
      const sparerequestId = window.localStorage.getItem('sparerequestEditId');
      if (!sparerequestId) {
        alert('Invalid action.');
        this.router.navigate(['spares/request']); // list spare request
        return;
    }
  
    this.editForm = this.formBuilder.group({
  
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
  
      this.sparerequest = this.utilsService.cleanObject(this.getRecord(sparerequestId));
  
      this.editForm.get('code').setValue(this.sparerequest.code || '');
      this.editForm.get('pmt_maintenance_id').setValue(this.sparerequest.pmt_maintenance_id || '');
      this.editForm.get('spare_id').setValue(this.sparerequest.spare_id);
      this.editForm.get('quantity').setValue(this.sparerequest. quantity);
      this.editForm.get('request_date').setValue(this.sparerequest.request_date || '');
      this.editForm.get('user_type').setValue(this.sparerequest.user_type || '');
      this.editForm.get('recipient_staff_id').setValue(this.sparerequest.recipient_staff_id || '');
      this.editForm.get('recipient_driver_id').setValue(this.sparerequest.recipient_driver_id || '');
      this.editForm.get('vehicle_id').setValue(this.sparerequest.vehicle_id || '');
      this.editForm.get('description').setValue(this.sparerequest.description || '');
      this.editForm.get('approved_date').setValue(this.sparerequest.approved_date || '');
      this.editForm.get('approved_by').setValue(this.sparerequest.approved_by || '');
      this.editForm.get('issued_date').setValue(this.sparerequest.issued_date || '');
      this.editForm.get('issued_by').setValue(this.sparerequest.issued_by || '');
      this.editForm.get('issuer_remark').setValue(this.sparerequest.issuer_remark || '');
      this.editForm.get('location_id').setValue(this.sparerequest.location_id || '');
      this.editForm.get('request_status').setValue(this.sparerequest.request_status || '');
      this.editForm.get('issue_status').setValue(this.sparerequest.issue_status);
  
      console.log('\nSpareRequest Name', typeof this.sparerequest, this.sparerequest);
    }
      onSubmit() {
        const payload = this.editForm.value;
        payload.id = this.sparerequest.id;
        console.log('editForm payload ', payload);
        this.apiService.updateSpareRequest(payload).pipe(first()).subscribe(data => {
              this.response = data;
              this.sparerequest = this.response.payload;
              if (this.response.success) {
                alert('Spare request updated successfully.');
                this.router.navigate(['spares/request']); // list-spare
                // Update Local Content
               // window.localStorage.setItem('spare', JSON.stringify(this.response.payload));
                window.localStorage.setItem('sparerequest_updated', JSON.stringify(new Date()));
              } else {
                alert(this.response.message);
              }
  
  
            },
            error => {
              alert(error);
            });
      }
  
      getRecord(sparerequestId) {
        console.log('\nsparerequest Id ', sparerequestId);
        const storedRecords = window.localStorage.getItem('sparerequest');
        const updated = window.localStorage.getItem('sparerequest_updated');
        if (storedRecords) {
            this.sparerequest = JSON.parse(storedRecords);
            console.log(`Records retrieved since ${updated}`);
        }
        const t = this.apiService.getOneSpare(this.sparerequest, sparerequestId);
        return t[0];
      }
  
      sparerequestAdd(): void {
        this.router.navigate(['spares/request-add']);
      }
  
      goBack() {
        this.router.navigate(['spares/request']);
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
