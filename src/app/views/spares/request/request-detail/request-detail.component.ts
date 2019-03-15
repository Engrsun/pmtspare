import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../../_services';
import { SpareLog, SpareRequest } from '../../../../_models';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

  sparerequests: Array<SpareRequest>;
  sparerequest: SpareRequest;

    id = '';
    code = ''; // string;
    pmt_maintenance_id = ''; //string;
    spare_id = ''; //string;
    quantity = ''; //Number;
    request_date = ''; //Date;
    user_type = ''; //string;
    recipient_staff_id = ''; //string;
    recipient_driver_id = ''; //string;
    vehicle_id = '';//string;
    description = ''; //string;
    approved_date = ''; //Date;
    approved_by = ''; //string	;
    issued_date = ''; //Date;
    issued_by = ''; //string;
    issuer_remark = ''; //string;
    location_id = ''; //string;
    request_status = ''; //string;
    issue_status = ''; //string;

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }


  ngOnInit() {
    const sparerequestId = window.localStorage.getItem('sparerequestDetailId');
    if (!sparerequestId) {
      alert('Invalid action.');
      this.router.navigate(['/spares/request']); // list-spare request
      return;
    }

    this.sparerequest = this.utilsService.cleanObject(this.getRecord(sparerequestId));

    this.id = this.sparerequest.id || '';
    this.code = this.sparerequest.code ||''; // string;
    this.pmt_maintenance_id = this.sparerequest.pmt_maintenance_id || ''; //string;
    this.spare_id = this.sparerequest.spare_id || ''; //string;
    this.quantity = this.sparerequest.quantity.toString(10); //Number;
    this.request_date = this.sparerequest.request_date.toString(); //Date;
    this.user_type = this.sparerequest.user_type || ''; //string;
    this.recipient_staff_id = this.sparerequest.recipient_driver_id || ''; //string;
    this.recipient_driver_id = this.sparerequest.recipient_driver_id || ''; //string;
    this.vehicle_id = this.sparerequest.vehicle_id || '';//string;
    this.description = this.sparerequest.description || ''; //string;
    this.approved_date = this.sparerequest.approved_date.toString(); //Date;
    this.approved_by = this.sparerequest.approved_by || ''; //string	;
    this.issued_date = this.sparerequest.issued_date.toString(); //Date;
    this.issued_by = this.sparerequest.issued_by || ''; //string;
    this.issuer_remark = this.sparerequest.issuer_remark || ''; //string;
    this.location_id = this.sparerequest.location_id || ''; //string;
    this.request_status = this.sparerequest.request_status || ''; //string;
    this.issue_status = this.sparerequest.issue_status || ''; //string;
    

    console.log('\nSpareRequest Name', typeof this.sparerequest, this.sparerequest);
  }

  getRecord(SpareRequestId) {
    console.log('\nSpareRequest Id ', SpareRequestId);
    const storedRecords = window.localStorage.getItem('sparerequest');
    const updated = window.localStorage.getItem('sparerequest_updated');
    if (storedRecords) {
      this.sparerequest = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getOneSpareRequest(this.sparerequest, SpareRequestId);
    return t[0];
  }

  sparerequestEdit(sparerequest: SpareRequest): void {
    window.localStorage.removeItem('sparerequestEditId');
    window.localStorage.setItem('sparerequestEditId', sparerequest.id);
    this.router.navigate(['spares/request-edit']);
  }

  sparerequestAdd(): void {
    this.router.navigate(['spares/request-add']);
  }

  goBack() {
    this.router.navigate(['/spares/request']);
  }

}
