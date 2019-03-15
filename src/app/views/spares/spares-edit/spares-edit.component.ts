import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface, Spares } from '../../../_models';


@Component({
  selector: 'app-spares-edit',
  templateUrl: './spares-edit.component.html',
  styleUrls: ['./spares-edit.component.scss']
})
export class SparesEditComponent implements OnInit {
  spares: Array<Spares>;
  spare: Spares;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  
    ngOnInit() {
      const spareId = window.localStorage.getItem('sparesEditId');
      if (!spareId) {
        alert('Invalid action.');
        this.router.navigate(['spares']); // list spare
        return;
    }
  
    this.editForm = this.formBuilder.group({
  
      code:	[''], //string
      name: [''], //string
      measure:	[''], //string
      model: [''], //string
      make:	[''], //string
      category: [''], //string
      description: [''], //string
      parent_spare_id: [''], //string
      split_gain: [''], //number
      splittable:	[''], //boolean
      depletion:	[''], //number
      reorder_level:	[''], //number
      reorder_quantity:	[''], //number
      unit_price: [''], //number
      supplier_id: [''], //string
      is_usability:	[''], //boolean
      photo:	[''], //string
      });
  
      this.spare = this.utilsService.cleanObject(this.getRecord(spareId));
  
      this.editForm.get('code').setValue(this.spare.code || '');
      this.editForm.get('name').setValue(this.spare.name || '');
      this.editForm.get('measure').setValue(this.spare.measure || '');
      this.editForm.get('model').setValue(this.spare.model || '');
      this.editForm.get('make').setValue(this.spare.make || '');
      this.editForm.get('category').setValue(this.spare.category || '');
      this.editForm.get('description').setValue(this.spare.description || '');
      this.editForm.get('parent_spare_id').setValue(this.spare.parent_spare_id || '');
      this.editForm.get('split_gain').setValue(this.spare.split_gain.toString(10));
      this.editForm.get('splittable').setValue(this.spare.splittable.toString());
      this.editForm.get('depletion').setValue(this.spare.depletion.toString(10));
      this.editForm.get('reorder_level').setValue(this.spare.reorder_level.toString(10));
      this.editForm.get('reorder_quantity').setValue(this.spare.reorder_quantity.toString(10));
      this.editForm.get('unit_price').setValue(this.spare.unit_price.toString(10));
      this.editForm.get('supplier_id').setValue(this.spare.supplier_id || '');
      this.editForm.get('is_usability').setValue(this.spare.is_usability || '');
      //this.editForm.get('photo').setValue(this.spare.photo.toString());
  
      console.log('\nSpare Name', typeof this.spare, this.spare);
    }
      onSubmit() {
        const payload = this.editForm.value;
        payload.id = this.spare.id;
        console.log('editForm payload ', payload);
        this.apiService.updateSpares(payload).pipe(first()).subscribe(data => {
              this.response = data;
              this.spare = this.response.payload;
              if (this.response.success) {
                alert('Spare updated successfully.');
                this.router.navigate(['spares']); // list-spare
                // Update Local Content
               // window.localStorage.setItem('spare', JSON.stringify(this.response.payload));
                window.localStorage.setItem('spare_updated', JSON.stringify(new Date()));
              } else {
                alert(this.response.message);
              }
  
  
            },
            error => {
              alert(error);
            });
      }
  
      getRecord(spareId) {
        console.log('\nspare Id ', spareId);
        const storedRecords = window.localStorage.getItem('spares');
        const updated = window.localStorage.getItem('spare_updated');
        if (storedRecords) {
            this.spare = JSON.parse(storedRecords);
            console.log(`Records retrieved since ${updated}`);
        }
        const t = this.apiService.getOneSpare(this.spare, spareId);
        return t[0];
      }
  
      sparesAdd(): void {
        this.router.navigate(['spares/spares-add']);
      }
  
      goBack() {
        this.router.navigate(['spares']);
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