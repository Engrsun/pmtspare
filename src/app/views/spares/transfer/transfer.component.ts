import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Router } from '@angular/router';
import { Spares, SpareTransfer, ApiResponse, SpareStock } from '../../../_models';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  response: any;
  success = false;
  message = '';
  sparetransfer: Array<SpareTransfer>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     if (!window.localStorage.getItem('token')) {
    this.router.navigate(['../login']);
    return;
  }
  const storedRecords = window.localStorage.getItem('sparetransfer');
  const updated = window.localStorage.getItem('sparetransfer_updated');
  if (storedRecords && updated) {
      this.sparetransfer = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
  } else {
    this.sparetransferRetrieve();
  }
}

sparetransferRetrieve(): void {
  this.apiService.retrieveSpareTransfer().subscribe(data => {
    this.response = data;
    this.sparetransfer = this.response.payload;
    this.success = this.response.success;
    this.message = this.response.message;
    if (this.response.success) {
      window.localStorage.setItem('sparetransfer', JSON.stringify(this.response.payload));
      window.localStorage.setItem('sparetransfer_updated', JSON.stringify(new Date()));
    }
  });
}

sparetransferDetail(sparetransfer: SpareTransfer): void {
  window.localStorage.removeItem('sparetransferDetailId');
  window.localStorage.setItem('sparetransferDetailId', sparetransfer.id);
  this.router.navigate(['spares/transfer-detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to transfer detail');
  return;
}

sparetransferDelete(sparetransfer: SpareTransfer): void {
  this.apiService.deleteSpareTransfer(sparetransfer.id).subscribe( data => {
      this.sparetransfer = this.sparetransfer.filter(i => i.id !== sparetransfer.id);
      window.localStorage.setItem('sparetransfer', JSON.stringify(this.sparetransfer));
    });
}

sparetransferEdit(sparetransfer: SpareTransfer): void {
  window.localStorage.removeItem('sparetransferEditId');
  window.localStorage.setItem('sparetransferEditId',sparetransfer.id);
  this.router.navigate(['spares/transfer-edit']);
}

sparetransferAdd(): void {
  this.router.navigate(['spares/transfer-add']);
}

}
