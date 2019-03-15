import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../../_services';
import { SparesLocation } from '../../../../_models';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {
  spareslocations: Array<SparesLocation>;
  spareslocation: SparesLocation;

  id = '';
  name = '';
  address = '';	
  staff_list= '';
  headed_by= '';	
  terminal_id= '';

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const spareslocationId = window.localStorage.getItem('spareslocatioDetailId');
    if (!spareslocationId) {
      alert('Invalid action.');
      this.router.navigate(['spares/location']); // list-Spare location
      return;
    }

    this.spareslocation = this.utilsService.cleanObject(this.getRecord(spareslocationId));
    
    this.id = this.spareslocation.id || '';
    this.name = this.spareslocation.name || '';
    this.address = this.spareslocation.address;
    this.headed_by = this.spareslocation.headed_by || '';
    this.staff_list = this.spareslocation.staff_list || '';
    this.terminal_id = this.spareslocation.terminal_id || '';
    console.log('\nSpare Location Name', typeof this.spareslocation, this.spareslocation);
  }

  getRecord(spareslocationId) {
    console.log('\nspareslocation Id ', spareslocationId);
    const storedRecords = window.localStorage.getItem('spareslocation');
    const updated = window.localStorage.getItem('spareslocation_updated');
    if (storedRecords) {
        this.spareslocation = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getSparesLocation(this.spareslocation, spareslocationId);
    return t[0];
  }

  spareslocationEdit(spareslocation: SparesLocation): void {
    window.localStorage.removeItem('spareslocationEditId');
    window.localStorage.setItem('spareslocationEditId', spareslocation.id);
    this.router.navigate(['spares/location-edit']);
  }

  spareslocationlAdd(): void {
    this.router.navigate(['spares/location-add']);
  }

  goBack() {
    this.router.navigate(['spares/location']);
  }
}
