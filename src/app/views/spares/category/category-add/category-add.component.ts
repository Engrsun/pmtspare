import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../_services';
import { SpareCategory, SpareLog, Spares, ApiResponse, SelectOptionInterface } from '../../../../_models';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  addForm: FormGroup;

  cities: SelectOptionInterface[];
  activeCity: SelectOptionInterface[];

  counties: SelectOptionInterface[];
  activeCounty: SelectOptionInterface[];

  private value = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
    id: [''], //string;
    name: [''], // string;
    description: [''], //string;
    });

   }

   onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    
    this.apiService.createSpareCategory(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('sparecategoryDetailId', data.payload.id);
        this.router.navigate(['/spares/category-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['/spares/category']);
      });
  }

  goBack() {
    this.router.navigate(['/spares/category']);
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
