import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../../_services';
import { SpareTransfer } from '../../../../_models';

@Component({
  selector: 'app-transfer-detail',
  templateUrl: './transfer-detail.component.html',
  styleUrls: ['./transfer-detail.component.scss']
})
export class TransferDetailComponent implements OnInit {

  
  sparetransfers: Array<SpareTransfer>;
  sparetransfer: SpareTransfer;

    id = ''; //string;
    name = ''; // string;
    code = ''; //string;
    spare_id = ''; //string;
    quantity = ''; //number;
    location_from = ''; //string;
    location_to = ''; //string;
    description = ''; //string;
    fulfilled_date = ''; //Date;
    fulfilled_by = ''; //string;
    confirmed_by = ''; //string;
    confirmed_date = ''; //Date;	
    transfer_status = ''; //string;

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }


  ngOnInit() {
    const sparetransferId = window.localStorage.getItem('sparetransferDetailId');
    if (!sparetransferId) {
      alert('Invalid action.');
      this.router.navigate(['/spares/transfer']); // list-spare transfer
      return;
    }

    this.sparetransfer = this.utilsService.cleanObject(this.getRecord(sparetransferId));

    this.id = this.sparetransfer.id || '';
    this.code = this.sparetransfer.code ||''; // string;
    this.spare_id = this.sparetransfer.spare_id || ''; //string;
    this.quantity = this.sparetransfer.quantity.toString(10); //number;
    this.location_from = this.sparetransfer.location_from || ''; //string;
    this.location_to = this.sparetransfer.location_to || ''; //string;
    this.description = this.sparetransfer.description || ''; //string;
    this.fulfilled_date = this.sparetransfer.fulfilled_date.toString() || ''; //date;
    this.fulfilled_by = this.sparetransfer.fulfilled_by || ''; //string;
    this.confirmed_by = this.sparetransfer.confirmed_by || ''; //string;
    this.confirmed_date = this.sparetransfer.confirmed_date.toString(); //date;
    this.transfer_status = this.sparetransfer.transfer_status || ''; //string;

    console.log('\nSpareTransfer Name', typeof this.sparetransfer, this.sparetransfer);
  }

  getRecord(SpareTransferId) {
    console.log('\nSpareTransfer Id ', SpareTransferId);
    const storedRecords = window.localStorage.getItem('sparetransfer');
    const updated = window.localStorage.getItem('sparetransfer_updated');
    if (storedRecords) {
      this.sparetransfer = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getOneSpareTransfer(this.sparetransfer, SpareTransferId);
    return t[0];
  }

  sparetransferEdit(sparetransfer: SpareTransfer): void {
    window.localStorage.removeItem('sparetransferEditId');
    window.localStorage.setItem('sparetransferEditId', sparetransfer.id);
    this.router.navigate(['spares/transfer-edit']);
  }

  sparetransferAdd(): void {
    this.router.navigate(['spares/transfer-add']);
  }

  goBack() {
    this.router.navigate(['/spares/transfer']);
  }

}
