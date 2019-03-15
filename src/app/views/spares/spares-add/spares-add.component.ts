import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { Spares, ApiResponse, SelectOptionInterface } from '../../../_models';

@Component({
  selector: 'app-spares-add',
  templateUrl: './spares-add.component.html',
  styleUrls: ['./spares-add.component.scss']
})
export class SparesAddComponent implements OnInit {
  addForm: FormGroup;

  cities: SelectOptionInterface[];
  activeCity: SelectOptionInterface[];

  counties: SelectOptionInterface[];
  activeCounty: SelectOptionInterface[];

  private value = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
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

   }

   onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    // payload.city_id = payload.city.id;
    // payload.county_id = payload.county.id;
    // delete payload.city;
    // delete payload.county;
    this.apiService.createSpares(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('sparesDetailId', data.payload.id);
        this.router.navigate(['/spares/spares-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['/spares']);
      });
  }

  goBack() {
    this.router.navigate(['/spares']);
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
