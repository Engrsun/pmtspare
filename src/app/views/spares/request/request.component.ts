import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Router } from '@angular/router';
import { Spares, SpareRequest, ApiResponse } from '../../../_models';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  response: any;
  success = false;
  message = '';
  sparerequest: Array<SpareRequest>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     if (!window.localStorage.getItem('token')) {
    this.router.navigate(['login']);
    return;
  }
  const storedRecords = window.localStorage.getItem('sparerequest');
  const updated = window.localStorage.getItem('sparerequest_updated');
  if (storedRecords && updated) {
      this.sparerequest = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
  } else {
    this.sparerequestRetrieve();
  }
}

sparerequestRetrieve(): void {
  this.apiService.retrieveSpareRequest().subscribe(data => {
    this.response = data;
    this.sparerequest = this.response.payload;
    this.success = this.response.success;
    this.message = this.response.message;
    if (this.response.success) {
      window.localStorage.setItem('sparerequest', JSON.stringify(this.response.payload));
      window.localStorage.setItem('sparerequest_updated', JSON.stringify(new Date()));
    }
  });
}

sparerequestDetail(sparerequest: SpareRequest): void {
  window.localStorage.removeItem('sparerequestDetailId');
  window.localStorage.setItem('sparerequestDetailId', sparerequest.id);
  this.router.navigate(['spares/request-detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to request detail');
  return;
}

sparerequestDelete(sparerequest: SpareRequest): void {
  this.apiService.deleteSpareRequest(sparerequest.id).subscribe( data => {
      this.sparerequest = this.sparerequest.filter(i => i.id !== sparerequest.id);
      window.localStorage.setItem('sparerequest', JSON.stringify(this.sparerequest));
    });
}

sparerequestEdit(sparerequest: SpareRequest): void {
  window.localStorage.removeItem('sparerequestEditId');
  window.localStorage.setItem('sparerequestEditId',sparerequest.id);
  this.router.navigate(['spares/request-edit']);
}

sparerequestAdd(): void {
  this.router.navigate(['spares/request-add']);
}


}
