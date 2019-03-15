import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface, Spares, SpareTransfer } from '../../../../_models';

@Component({
  selector: 'app-transfer-edit',
  templateUrl: './transfer-edit.component.html',
  styleUrls: ['./transfer-edit.component.scss']
})
export class TransferEditComponent implements OnInit {
  sparetransfers: Array<SpareTransfer>;
  sparetransfer: SpareTransfer;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  
    ngOnInit() {
      const sparetransferId = window.localStorage.getItem('sparetransferEditId');
      if (!sparetransferId) {
        alert('Invalid action.');
        this.router.navigate(['spares/transfer']); // list spare transfer
        return;
    }
  
    this.editForm = this.formBuilder.group({
  
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
  
      this.sparetransfer = this.utilsService.cleanObject(this.getRecord(sparetransferId));
  
      this.editForm.get('code').setValue(this.sparetransfer.code || '');
      this.editForm.get('spare_id').setValue(this.sparetransfer.spare_id || '');
      this.editForm.get('quantity').setValue(this.sparetransfer.quantity.toString(10));
      this.editForm.get('location_from').setValue(this.sparetransfer.location_from || '');
      this.editForm.get('location_to').setValue(this.sparetransfer.location_to || '');
      this.editForm.get('description').setValue(this.sparetransfer.description || '');
      this.editForm.get('fulfilled_date').setValue(this.sparetransfer.fulfilled_date || '');
      this.editForm.get('fulfilled_by').setValue(this.sparetransfer.fulfilled_by || '');
      this.editForm.get('confirmed_by').setValue(this.sparetransfer.confirmed_by || '');
      this.editForm.get('confirmed_date').setValue(this.sparetransfer.confirmed_date || '');
      this.editForm.get('transfer_status').setValue(this.sparetransfer.transfer_status || '');
  
      console.log('\nSparetransfer Name', typeof this.sparetransfer, this.sparetransfer);
    }
      onSubmit() {
        const payload = this.editForm.value;
        payload.id = this.sparetransfer.id;
        console.log('editForm payload ', payload);
        this.apiService.updateSpareTransfer(payload).pipe(first()).subscribe(data => {
              this.response = data;
              this.sparetransfer = this.response.payload;
              if (this.response.success) {
                alert('Spare transfer updated successfully.');
                this.router.navigate(['spares/transfer']); // list-spare transfer
                // Update Local Content
               // window.localStorage.setItem('spare', JSON.stringify(this.response.payload));
                window.localStorage.setItem('sparetransfer_updated', JSON.stringify(new Date()));
              } else {
                alert(this.response.message);
              }
  
  
            },
            error => {
              alert(error);
            });
      }
  
      getRecord(sparetransferId) {
        console.log('\nsparetransfer Id ', sparetransferId);
        const storedRecords = window.localStorage.getItem('sparetransfer');
        const updated = window.localStorage.getItem('sparetransfer_updated');
        if (storedRecords) {
            this.sparetransfer = JSON.parse(storedRecords);
            console.log(`Records retrieved since ${updated}`);
        }
        const t = this.apiService.getOneSpare(this.sparetransfer, sparetransferId);
        return t[0];
      }
  
      sparetransferAdd(): void {
        this.router.navigate(['spares/transfer-add']);
      }
  
      goBack() {
        this.router.navigate(['spares/transfer']);
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
