import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';
import { Spares, ApiResponse } from '../../_models';

@Component({
  selector: 'app-spares',
  templateUrl: './spares.component.html',
  styleUrls: ['./spares.component.scss']
})
export class SparesComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  spares: Array<Spares>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
     if (!window.localStorage.getItem('token')) {
    this.router.navigate(['login']);
    return;
  }
  const storedRecords = window.localStorage.getItem('spares');
  const updated = window.localStorage.getItem('spares_updated');
  if (storedRecords && updated) {
      this.spares = JSON.parse(storedRecords);
      this.success = true;
      this.message = `Records retrieved since ${updated}`;
  } else {
    this.sparesRetrieve();
  }
}

sparesRetrieve(): void {
  this.apiService.getSpares().subscribe(data => {
    this.response = data;
    this.spares = this.response.payload;
    this.success = this.response.success;
    this.message = this.response.message;
    if (this.response.success) {
      window.localStorage.setItem('spares', JSON.stringify(this.response.payload));
      window.localStorage.setItem('spares_updated', JSON.stringify(new Date()));
    }
  });
}

sparesDetail(spares: Spares): void {
  window.localStorage.removeItem('spareDetailId');
  window.localStorage.setItem('spareDetailId', spares.id);
  this.router.navigate(['spares/spares-detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to spares detail');
  return;
}

sparesDelete(spares: Spares): void {
  this.apiService.deleteSpares(spares.id).subscribe( data => {
      this.spares = this.spares.filter(i => i.id !== spares.id);
      window.localStorage.setItem('spares', JSON.stringify(this.spares));
    });
}

sparesEdit(spares: Spares): void {
  window.localStorage.removeItem('sparesEditId');
  window.localStorage.setItem('sparesEditId', spares.id);
  this.router.navigate(['spares/spares-edit']);
}

sparesAdd(): void {
  this.router.navigate(['spares/spares-add']);
}

}
