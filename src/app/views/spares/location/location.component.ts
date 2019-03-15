import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services';
import { Router } from '@angular/router';
import { SparesLocation } from '../../../_models/spares-location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  spareslocation: Array<SparesLocation>;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    const storedRecords = window.localStorage.getItem('spareslocation');
    const updated = window.localStorage.getItem('spareslocation_updated');
    if (storedRecords && updated) {
        this.spareslocation = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.spareslocationRetrieve();
    }
  }

  spareslocationRetrieve(): void {
    this.apiService.retrieveSparesLocation().subscribe(data => {
      this.response = data;
      this.spareslocation = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('spareslocation', JSON.stringify(this.response.payload));
        window.localStorage.setItem('spareslocation_updated', JSON.stringify(new Date()));
      }
    });
  }

  spareslocationDetail(spareslocation: SparesLocation): void {
    window.localStorage.removeItem('spareslocationDetailId');
    window.localStorage.setItem('spareslocationDetailId', spareslocation.id);
    this.router.navigate(['spares/location-detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to spares location detail');
    return;
  }

  spareslocationDelete(spareslocation: SparesLocation): void {
    this.apiService.deleteSparesLocation(spareslocation.id).subscribe( data => {
        this.spareslocation = this.spareslocation.filter(i => i.id !== spareslocation.id);
        window.localStorage.setItem('spareslocation', JSON.stringify(this.spareslocation));
      });
  }

  spareslocationEdit(spareslocation: SparesLocation): void {
    window.localStorage.removeItem('spareslocationEditId');
    window.localStorage.setItem('spareslocationEditId', spareslocation.id);
    this.router.navigate(['spares/location-edit']);
  }

  spareslocationAdd(): void {
    this.router.navigate(['spares/location-add']);
  }
  

}
