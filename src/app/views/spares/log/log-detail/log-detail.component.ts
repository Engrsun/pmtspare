import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../../_services';
import { SpareLog } from '../../../../_models';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss']
})
export class LogDetailComponent implements OnInit {

  sparelogs: Array<SpareLog>;
  sparelog: SpareLog;

    id = '';
    name =''; // string;
    spare_id = ''; //string;
    location_id = ''; //string;
    quantity = ''; //number;
    transaction_code = ''; //string;
    description = ''; //string;
    order_type = ''; //string;
    spare_request_assignment_id = ''; //string;
    spare_sales_id = ''; //string;
    spare_purchase_id = ''; //string;
    spare_transfer_id =''; //string;
    recipient_type = ''; //string;
    staff_recipient_id = ''; //string;
    driver_recipient_id = ''; //string;
    customer_recipient_id = ''; //string;
    supplier_recipient_id = ''; //string;
    spare_staff = ''; //string;
    spare_staff_remark = ''; //string;
    transaction_date = ''; //Date;

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }


  ngOnInit() {
    const sparelogId = window.localStorage.getItem('sparelogDetailId');
    if (!sparelogId) {
      alert('Invalid action.');
      this.router.navigate(['/spares/log']); // list-spare log
      return;
    }

    this.sparelog = this.utilsService.cleanObject(this.getRecord(sparelogId));

    this.id = this.sparelog.id || '';
    //this.name = this.sparelog.name ||''; // string;
    this.spare_id = this.sparelog.spare_id || ''; //string;
    this.location_id = this.sparelog.location_id || ''; //string;
    this.quantity = this.sparelog.quantity.toString(10); //number;
    this.transaction_code = this.sparelog.transaction_code || ''; //string;
    this.description = this.sparelog.description || ''; //string;
    this.order_type = this.sparelog.order_type ||''; //string;
    this.spare_request_assignment_id = this.sparelog.spare_request_assignment_id || ''; //string;
    this.spare_sales_id = this.sparelog.spare_sales_id || ''; //string;
    this.spare_purchase_id = this.sparelog.spare_purchase_id || ''; //string;
    this.spare_transfer_id = this.sparelog.spare_transfer_id || ''; //string;
    this.recipient_type = this.sparelog.recipient_type || ''; //string;
    this.staff_recipient_id = this.sparelog.staff_recipient_id ||''; //string;
    this.driver_recipient_id = this.sparelog.driver_recipient_id || ''; //string;
    this.customer_recipient_id = this.sparelog.customer_recipient_id || ''; //string;
    this.supplier_recipient_id = this.sparelog.supplier_recipient_id || ''; //string;
    this.spare_staff = this.sparelog.spare_staff || ''; //string;
    this.spare_staff_remark = this.sparelog.spare_staff_remark || ''; //string;
    this.transaction_date = this.sparelog.transaction_date.toString();
    

    console.log('\nSpareLog Name', typeof this.sparelog, this.sparelog);
  }

  getRecord(SpareLogId) {
    console.log('\nSpareLog Id ', SpareLogId);
    const storedRecords = window.localStorage.getItem('sparelog');
    const updated = window.localStorage.getItem('spare_updated');
    if (storedRecords) {
      this.sparelog = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getOneSpareLog(this.sparelog, SpareLogId);
    return t[0];
  }

  sparelogEdit(sparelog: SpareLog): void {
    window.localStorage.removeItem('sparelogEditId');
    window.localStorage.setItem('sparelogEditId', sparelog.id);
    this.router.navigate(['spares/log-edit']);
  }

  sparelogAdd(): void {
    this.router.navigate(['spares/log-add']);
  }

  goBack() {
    this.router.navigate(['/spares/log']);
  }

}
