import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../../_services';
import { SparesLocation, ApiResponse, SelectOptionInterface } from '../../../../_models';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit {
  addForm: FormGroup;

  staff: SelectOptionInterface[];
  activeStaff: SelectOptionInterface[];

  private value = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.getStaff();
    this.addForm = this.formBuilder.group({
      name: [''],	//String	
      address: [''], //Nunber
      staff_list: [''],	//Nunber array
      headed_by: [''],	//String	
      terminal_id: [''],	//String
    });

  }
  getStaff() {
    const storeRecords = window.localStorage.getItem('staff');

    if (storeRecords) {
      this.staff = JSON.parse(storeRecords);
      console.log(this.staff);
      return;
    }
    this.apiService.retrieveStaff().subscribe(data => {
      if (data.success) {
        this.staff = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        window.localStorage.setItem('staff', JSON.stringify(this.staff));
      } else {
        console.log(data.message);
      }
    });
  }
  
  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    
    this.apiService.createSparesLocation(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('spareslocationDetailId', data.payload.id);
        this.router.navigate(['spares/location-detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['spares/location']);
      });
  }

  goBack() {
    this.router.navigate(['spares/location']);
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
