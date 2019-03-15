import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface, Spares, SpareLog } from '../../../../_models';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent implements OnInit {
  sparelogs: Array<SpareLog>;
  sparelog: SpareLog;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  
    ngOnInit() {
      const sparelogId = window.localStorage.getItem('sparelogEditId');
      if (!sparelogId) {
        alert('Invalid action.');
        this.router.navigate(['spares/log']); // list spare log
        return;
    }
  
    this.editForm = this.formBuilder.group({
  
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
  
      this.sparelog = this.utilsService.cleanObject(this.getRecord(sparelogId));
  
      this.editForm.get('spare_id').setValue(this.sparelog.spare_id || '');
      this.editForm.get('location_id').setValue(this.sparelog.location_id || '');
      this.editForm.get('quantity').setValue(this.sparelog.quantity.toString(10));
      this.editForm.get('transaction_code').setValue(this.sparelog.transaction_code || '');
      this.editForm.get('description').setValue(this.sparelog.description || '');
      this.editForm.get('order_type').setValue(this.sparelog.order_type || '');
      this.editForm.get('spare_request_assignment_id').setValue(this.sparelog.spare_request_assignment_id || '');
      this.editForm.get('spare_sales_id').setValue(this.sparelog.spare_sales_id || '');
      this.editForm.get('spare_purchase_id').setValue(this.sparelog.spare_purchase_id || '');
      this.editForm.get('spare_transfer_id').setValue(this.sparelog.spare_transfer_id || '');
      this.editForm.get('recipient_type').setValue(this.sparelog.recipient_type || '');
      this.editForm.get('staff_recipient_id').setValue(this.sparelog.staff_recipient_id || '');
      this.editForm.get('driver_recipient_id').setValue(this.sparelog.driver_recipient_id || '');
      this.editForm.get('customer_recipient_id').setValue(this.sparelog.customer_recipient_id || '');
      this.editForm.get('supplier_recipient_id').setValue(this.sparelog.supplier_recipient_id || '');
      this.editForm.get('spare_staff').setValue(this.sparelog.spare_staff || '');
      this.editForm.get('spare_staff_remark').setValue(this.sparelog.spare_staff_remark || '');
      this.editForm.get('transaction_date').setValue(this.sparelog.transaction_date);
  
      console.log('\nSpare Name', typeof this.sparelog, this.sparelog);
    }
      onSubmit() {
        const payload = this.editForm.value;
        payload.id = this.sparelog.id;
        console.log('editForm payload ', payload);
        this.apiService.updateSpareLog(payload).pipe(first()).subscribe(data => {
              this.response = data;
              this.sparelog = this.response.payload;
              if (this.response.success) {
                alert('Spare Log updated successfully.');
                this.router.navigate(['spares/log']); // list-spare
                // Update Local Content
               // window.localStorage.setItem('spare', JSON.stringify(this.response.payload));
                window.localStorage.setItem('sparelog_updated', JSON.stringify(new Date()));
              } else {
                alert(this.response.message);
              }
  
  
            },
            error => {
              alert(error);
            });
      }
  
      getRecord(sparelogId) {
        console.log('\nsparelog Id ', sparelogId);
        const storedRecords = window.localStorage.getItem('sparelog');
        const updated = window.localStorage.getItem('spare_updated');
        if (storedRecords) {
            this.sparelog = JSON.parse(storedRecords);
            console.log(`Records retrieved since ${updated}`);
        }
        const t = this.apiService.getOneSpare(this.sparelog, sparelogId);
        return t[0];
      }
  
      sparelogAdd(): void {
        this.router.navigate(['spares/log-add']);
      }
  
      goBack() {
        this.router.navigate(['spares/log']);
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
