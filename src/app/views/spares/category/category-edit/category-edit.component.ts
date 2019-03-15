import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface, Spares, SpareLog, SpareCategory } from '../../../../_models';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  sparecategories: Array<SpareCategory>;
  sparecategory: SpareCategory;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  
    ngOnInit() {
      const sparecategoryId = window.localStorage.getItem('sparecategoryEditId');
      if (!sparecategoryId) {
        alert('Invalid action.');
        this.router.navigate(['spares/category']); // list spare category
        return;
    }
  
    this.editForm = this.formBuilder.group({
  
    id: [''], //string;
    name: [''], // string;
    description: [''], //string;
      });
  
      this.sparecategory = this.utilsService.cleanObject(this.getRecord(sparecategoryId));
  
      this.editForm.get('name').setValue(this.sparecategory.name || '');
      this.editForm.get('description').setValue(this.sparecategory.description || '');
  
      console.log('\nSpareCategory Name', typeof this.sparecategory, this.sparecategory);
    }
      onSubmit() {
        const payload = this.editForm.value;
        payload.id = this.sparecategory.id;
        console.log('editForm payload ', payload);
        this.apiService.updateSpareCategory(payload).pipe(first()).subscribe(data => {
              this.response = data;
              this.sparecategory = this.response.payload;
              if (this.response.success) {
                alert('Spare category updated successfully.');
                this.router.navigate(['spares/category']); // list-spare
                // Update Local Content
               // window.localStorage.setItem('spare category', JSON.stringify(this.response.payload));
                window.localStorage.setItem('sparecategory_updated', JSON.stringify(new Date()));
              } else {
                alert(this.response.message);
              }
  
  
            },
            error => {
              alert(error);
            });
      }
  
      getRecord(sparecategoryId) {
        console.log('\nsparecategory Id ', sparecategoryId);
        const storedRecords = window.localStorage.getItem('sparecategory');
        const updated = window.localStorage.getItem('sparecategory_updated');
        if (storedRecords) {
            this.sparecategory = JSON.parse(storedRecords);
            console.log(`Records retrieved since ${updated}`);
        }
        const t = this.apiService.getOneSpareCategory(this.sparecategory, sparecategoryId);
        return t[0];
      }
  
      sparecategoryAdd(): void {
        this.router.navigate(['spares/category-add']);
      }
  
      goBack() {
        this.router.navigate(['spares/category']);
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
